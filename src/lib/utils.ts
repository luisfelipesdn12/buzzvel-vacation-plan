import { type ClassValue, clsx } from "clsx"
import { createHash } from "crypto";
import { twMerge } from "tailwind-merge"
import axios from "axios";

export interface Gravatar {
  hash: string
  requestHash: string
  profileUrl: string
  preferredUsername: string
  thumbnailUrl: string
  photos: {
      value: string
      type: string
  }[];
  last_profile_edit: string
  displayName: string
  name: {
      givenName: string
      familyName: string
      formatted: string
  }
  urls: {
      title: string
      value: string
  }[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getGravatar(email: string): Promise<{
  entry: Gravatar[],
}> {
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
