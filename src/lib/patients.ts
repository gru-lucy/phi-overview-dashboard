import { Patient } from "@/types/Patient";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "patients.json");

export async function getPatients(): Promise<Patient[]> {
  const raw = await fs.readFile(DATA_PATH, { encoding: "utf-8" });
  return JSON.parse(raw) as Patient[];
}
