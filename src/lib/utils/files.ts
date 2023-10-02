import { SERVER_URL } from "../../constants";

const QUALITY = 0.75;

export function blobToWebp(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const src = URL.createObjectURL(blob);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = (e) => {
      canvas.width = image.width;
      canvas.height = image.height;
      // @ts-ignore
      URL.revokeObjectURL(e.target.src);
      // @ts-ignore
      context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (data) => {
          resolve(data as Blob);
        },
        "image/webp",
        QUALITY,
      );
    };
    image.onerror = (e) => reject(e);
  });
}

export function getPhotoURL(photo: string) {
  return `${SERVER_URL}/file?id=${photo}`;
}
