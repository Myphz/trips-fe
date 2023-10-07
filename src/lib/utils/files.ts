import type { GetRowType, GetRowTypes } from "$lib/types/api";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { MEANS_OF_TRANSPORT, SERVER_URL } from "../../constants";
import { success } from "./toasts";

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

function blobToJpeg(blob: Blob): Promise<Blob> {
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
        "image/jpeg",
        1,
      );
    };
    image.onerror = (e) => reject(e);
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

export async function getPhotoURL(photo: string) {
  const reqUrl = `${SERVER_URL}/file?id=${photo}`;
  return await (await fetch(reqUrl)).text();
}

const IMAGES_NUMBER = {
  transport: 2,
  lodging: 3,
  trip: 11,
} as const;

export function getPlaceholderImage(card: GetRowTypes) {
  if (card.type === "transport") return getPlaceholderTransportImage(card);
  const folderName = card.type === "place" ? "trip" : card.type;
  return `/placeholder/${folderName}/${(card.id % IMAGES_NUMBER[folderName]) + 1}.webp`;
}

export function getPlaceholderTransportImage(card: GetRowType<"transport">) {
  const means = MEANS_OF_TRANSPORT.map((opt) => opt.label.toLowerCase());
  const mean = card.mean ?? means[Math.floor(Math.random() * means.length)];
  return `/placeholder/transport/${mean.toLowerCase()}/${
    (card.id % IMAGES_NUMBER["transport"]) + 1
  }.webp`;
}

export async function downloadImage(photo: string) {
  const res = await fetch(`${SERVER_URL}/download?id=${photo}`);
  const blob = await res.blob();
  const jpegBlob = await blobToJpeg(blob);
  const jpegData = await blobToBase64(jpegBlob);

  await Filesystem.writeFile({
    path: `Download/photo${(+new Date()).toString().slice(-3)}.jpeg`,
    data: jpegData,
    directory: Directory.ExternalStorage,
  });

  success({ title: "Image saved", msg: "Image saved successfully" });
}
