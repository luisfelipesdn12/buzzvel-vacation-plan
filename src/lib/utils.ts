import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { createHash } from "crypto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { twMerge } from "tailwind-merge";
import { Plan } from "./database.types";

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

export function generatePlanPdf(plan: Plan) {
  const doc = new jsPDF();

  doc.setFont("Helvetica")
  doc.setFontSize(18);
  doc.text("Trip", 15, 30);
  autoTable(doc, {
    startY: 40,
    head: [["", ""]],
    body: [
      ["Name", plan.title],
      ["Description", plan.description],
      ["Location", plan.location],
      ["Date", new Date(plan.date).toLocaleDateString()],
      ["Created at", new Date(plan.created_at).toLocaleDateString()],
      ["Last update at", new Date(plan.updated_at).toLocaleDateString()],
    ],
  });

  if (plan.participants.length > 0) {
    doc.text("Participants", 15, 110);
    autoTable(doc, {
      startY: 115,
      head: [["Name", "Email"]],
      body: plan.participants.map((participant) => [
        participant.name,
        participant.email,
      ]),
    });
  }

  doc.save(`plan_${plan.title.replace(/\s+/g, "_")}.pdf`);
}
