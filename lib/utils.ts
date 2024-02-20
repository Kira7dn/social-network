import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create isBase64 function
export function isBase64Image(imageData: string) {
  const base64Regex =
    /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

// create function receive _creationTime as agument and return created time as "1 hour ago", "1 day ago","20 Dec 2020" etc
export const createdTime = (time: number) => {
  const now = new Date().getTime();
  const diff = now - time;
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;
  if (seconds < 60)
    return `${Math.floor(seconds)} seconds ago`;
  if (minutes < 60)
    return `${Math.floor(minutes)} minutes ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (days < 30) return `${Math.floor(days)} days ago`;
  if (months < 12)
    return `${Math.floor(months)} months ago`;
  return `${Math.floor(years)} years ago`;
};

export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(
            new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        }, "image/jpeg");
      }
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
