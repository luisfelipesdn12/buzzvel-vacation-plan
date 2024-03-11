import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { createHash } from "crypto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { twMerge } from "tailwind-merge";
import { Plan } from "./database.types";

/**
 * This interface specifies the structure of an object that represents a Gravatar
profile. Each property within the interface defines a specific attribute of a Gravatar profile, such
as `hash`, `requestHash`, `profileUrl`, `preferredUsername`, `thumbnailUrl`, `photos`,
`last_profile_edit`, `displayName`, `name`, and `urls`
 */
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

/**
 * The function `cn` in TypeScript merges multiple class values using `clsx` and `twMerge`.
 * @param {ClassValue[]} inputs - The `inputs` parameter in the `cn` function is a rest parameter that
 * allows you to pass any number of arguments of type `ClassValue`. These arguments can be strings,
 * arrays, or objects representing CSS classes. The function then merges and processes these class
 * values using the `clsx` and
 * @returns The `cn` function is returning the result of merging the class names passed as arguments
 * using the `clsx` function and then applying Tailwind CSS utility classes using the `twMerge`
 * function.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Retrieves Gravatar data based on the provided email address.
 * @param {string} email - The `getGravatar` function takes an email address as a parameter. This email
 * address is used to generate a hash using the SHA-256 algorithm, which is then used to fetch data
 * from the Gravatar API. The function returns a Promise that resolves to an object with an `entry`
 * property
 * @returns The `getGravatar` function returns a Promise that resolves to an object with an `entry`
 * property containing an array of Gravatar objects. If there is an error during the API call, it will
 * return an object with an empty `entry` array and an `error` property containing the error object.
 */
export async function getGravatar(email: string): Promise<{
  entry: Gravatar[],
}> {
    const hash = createHash("sha256")
        .update(email.toLowerCase())
        .digest("hex");

    return await axios.get(`https://gravatar.com/${hash}.json`)
        .then(data => data.data)
        .catch((e) => ({ entry: [], error: e }));
}
/**
 * The function `generatePlanPdf` creates a PDF document with details of a trip plan, including title,
 * description, location, date, participants, and timestamps.
 * @param {Plan} plan - The `generatePlanPdf` function you provided generates a PDF document based on
 * the information in the `plan` object.
 */
export function generatePlanPdf(plan: Plan) {
    const doc = new jsPDF();

    doc.setFont("Helvetica");
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
