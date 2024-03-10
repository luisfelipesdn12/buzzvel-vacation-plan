import { type ClassValue, clsx } from "clsx"
import { createHash } from "crypto";
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getGravatar(email: string) {
  const hash = createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex");

  return await axios.get(`https://gravatar.com/${hash}.json`)
    .then(data => data.data)
    .catch((e) => {
      console.error(e);
      return {};
    });
}
