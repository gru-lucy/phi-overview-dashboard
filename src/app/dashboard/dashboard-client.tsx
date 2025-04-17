"use client";

import { useState } from "react";
import { Patient } from "@/types/Patient";
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VitalsChart from "./vitals-chart";
import { DataTable } from "@/components/data-table";

interface Props {
  patients: Patient[];
}

export default function DashboardClient({ patients }: Props) {
  const [selected, setSelected] = useState<Patient | null>(null);

  return (
    <>
      <DataTable
        data={patients}
        columns={columns}
        onRowClick={(p) => setSelected(p)}
      />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selected.firstName} {selected.lastName} - health information trend
                </DialogTitle>
              </DialogHeader>
              <VitalsChart patient={selected} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
