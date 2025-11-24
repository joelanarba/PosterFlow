const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const fetch = require("node-fetch");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

setGlobalOptions({ maxInstances: 10, timeoutSeconds: 60 });

// Get HuggingFace API Key
function getHFKey() {
  return process.env.HUGGINGFACE_API_KEY || null;
}

exports.generateBackground = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const userPrompt = request.data.prompt || "abstract colorful event background";

  const apiKey = getHFKey();
  if (!apiKey) {
    throw new HttpsError(
      "failed-precondition",
      "HuggingFace API key not configured. Set HUGGINGFACE_API_KEY."
    );
  }

  try {
    const HF_MODEL = "stabilityai/stable-diffusion-xl-base-1.0"; // FREE model

    console.log("Calling HuggingFace:", HF_MODEL, userPrompt);

    const response = await fetch(
      `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: userPrompt,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("HF Error:", err);
      throw new HttpsError("internal", `HuggingFace generation failed: ${err}`);
    }

    // Returns base64 image bytes
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    return {
      imageUrl: `data:image/png;base64,${base64Image}`,
    };
  } catch (error) {
    console.error("Generation Error:", error);
    throw new HttpsError("internal", `AI generation failed: ${error.message}`);
  }
});

exports.verifyPayment = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const reference = request.data.reference;
  if (!reference) {
    throw new HttpsError("invalid-argument", "Payment reference is required.");
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new HttpsError("failed-precondition", "Paystack secret key not configured.");
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      throw new HttpsError("aborted", "Payment verification failed.");
    }

    // Handle Credit Top-up
    if (request.data.type === 'credits' && request.data.credits) {
      const userRef = db.collection('users').doc(request.auth.uid);
      await userRef.set({
        credits: FieldValue.increment(request.data.credits)
      }, { merge: true });
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Payment Verification Error:", error);
    throw new HttpsError("internal", "Unable to verify payment.");
  }
});

exports.deductCredits = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const amount = request.data.amount || 1;
  const userRef = db.collection('users').doc(request.auth.uid);

  try {
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new HttpsError("not-found", "User does not exist.");
      }

      const currentCredits = userDoc.data().credits || 0;
      if (currentCredits < amount) {
        throw new HttpsError("failed-precondition", "Insufficient credits.");
      }

      transaction.update(userRef, {
        credits: FieldValue.increment(-amount)
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Deduct Credits Error:", error);
    if (error.code === 'failed-precondition') {
      throw error;
    }
    throw new HttpsError("internal", "Unable to deduct credits.");
  }
});
