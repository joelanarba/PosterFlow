const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");

// Allow up to 60 seconds for the AI to wake up
setGlobalOptions({ maxInstances: 10, timeoutSeconds: 60 });

exports.generateBackground = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const userPrompt = request.data.prompt || "abstract art";
  // Use SDXL - it is faster and more reliable on the free tier
  const MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

  console.log("Generating...", userPrompt);

  try {
    // Retry loop: Try up to 3 times if the model is loading
    let response;
    let attempts = 0;
    
    while (attempts < 3) {
      response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: userPrompt }),
      });

      if (response.ok) break; // Success! Exit loop.

      // Check if error is "Model is loading"
      const errorText = await response.clone().text();
      if (errorText.includes("loading")) {
        console.log("Model is sleeping... waiting 5s to retry.");
        await new Promise(r => setTimeout(r, 5000)); // Wait 5s
        attempts++;
      } else {
        // Real error (like Invalid Token)
        console.error("HF Error:", errorText);
        throw new Error(errorText);
      }
    }

    if (!response.ok) throw new Error("Model timed out.");

    // Convert Image
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    return { imageUrl: dataUrl };

  } catch (error) {
    console.error("Final Error:", error);
    throw new HttpsError("internal", "AI Generation failed. Please try again in a moment.");
  }
});