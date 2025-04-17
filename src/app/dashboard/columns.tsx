"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Patient } from "@/types/Patient";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "dob",
    header: "DOB",
    accessorFn: (row) => format(parseISO(row.dateOfBirth), "yyyy-MM-dd"),
  },
  {
    id: "lastVisit",
    header: "Last visit",
    accessorFn: (row) => format(parseISO(row.lastVisit), "yyyy-MM-dd"),
  },
];
