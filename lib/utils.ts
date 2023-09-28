import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create isBase64 function
export function isBase64Image(imageData: string) {
  const regex = /^data:image\/(png|jpeg|jpg|svg\+xml);base64,/;
  return regex.test(imageData);
}
