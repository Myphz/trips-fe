const QUALITY = 0.75;

self.addEventListener("message", async (event) => {
  const { imageData } = event.data;

  try {
    // Create an ImageBitmap from the image data
    const imageBitmap = await createImageBitmap(imageData);

    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const context = canvas.getContext("2d");

    // Draw the ImageBitmap on the canvas
    context.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);

    // Convert the canvas to a blob
    const webpBlob = await canvas.convertToBlob({ type: "image/webp", quality: QUALITY });
    self.postMessage({ webpBlob });
  } catch (error) {
    // Handle errors during image processing
    console.error("Image conversion error:", error.message);
    self.postMessage({ error: error.message });
  }
});
