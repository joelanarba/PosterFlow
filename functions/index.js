const functions = require("firebase-functions");
const Replicate = require("replicate");

// SECURE: Uses the environment variable we just created
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, 
});


exports.generateBackground = functions.https.onCall(async (data, context) => {
  // Security: Only allow logged-in users
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be logged in.");
  }

  const userPrompt = data.prompt || "abstract art";
  
  console.log("Generating background for:", userPrompt);

  try {
    // 2. Call Flux-Schnell (The "Nano" Model)
    const output = await replicate.run(
      "black-forest-labs/flux-1-schnell", 
      {
        input: {
          prompt: userPrompt,
          num_outputs: 1,
          aspect_ratio: "4:5",
          output_format: "jpg",
          output_quality: 80,
          disable_safety_checker: true // Optional: speeds it up
        }
      }
    );

    // 3. Send the image URL back to the app
    console.log("Success:", output);
    return { imageUrl: output[0] };

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw new functions.https.HttpsError("internal", "Failed to generate image.");
  }
});