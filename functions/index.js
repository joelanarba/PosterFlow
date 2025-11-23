const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const fetch = require("node-fetch");

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


