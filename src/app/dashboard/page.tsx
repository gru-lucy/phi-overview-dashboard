import { getPatients } from "@/lib/patients";
import DashboardClient from "./dashboard-client";

export const revalidate = 0; // always fresh

export default async function DashboardPage() {
  const patients = await getPatients(); // runs only on server

  return (
    <main className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Patient overview</h1>
      <DashboardClient patients={patients} />
    </main>
  );
}
