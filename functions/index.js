const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");

// Native 'fetch' is available in Node.js 18+ (which Firebase uses)

// Set timeout to 60s because AI takes time
setGlobalOptions({ maxInstances: 10, timeoutSeconds: 60 });

exports.generateBackground = onCall(async (request) => {
  // 1. Security Check
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const userPrompt = request.data.prompt || "abstract art";
  console.log("Generating with Hugging Face:", userPrompt);

  try {
    // 2. Call Hugging Face API (Flux.1-schnell)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: userPrompt }),
      }
    );

    // 3. Handle Errors (e.g. Model Loading)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF Error:", errorText);
      throw new Error(`Hugging Face API Error: ${response.statusText}`);
    }

    // 4. Convert Raw Image to Base64 Data URL
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    // 5. Return to Frontend
    return { imageUrl: dataUrl };

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw new HttpsError("internal", "Failed to generate image. Model might be busy.");
  }
});