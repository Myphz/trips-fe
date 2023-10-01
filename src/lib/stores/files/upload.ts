import type { PickedFile } from "@capawesome/capacitor-file-picker";
import { SERVER_URL } from "../../../constants";

const QUALITY = 0.75;

const b64toBlob = (b64Data: string, contentType: string, sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

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

export const uploadFiles = async (files: PickedFile[]) => {
  const formData = new FormData();

  for (const file of files) {
    const fileBlob = b64toBlob(file.data as string, file.mimeType);
    const webpBlob = await blobToWebp(fileBlob);
    formData.append("file", webpBlob);
  }

  const res = await fetch(`${SERVER_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  console.log(res);
  console.log(await res.json());
};
