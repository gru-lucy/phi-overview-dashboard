"use client";

import {
  ComposedChart,
  Bar,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { format, parseISO } from "date-fns";
import { Patient } from "@/types/Patient";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tooltip } from "recharts";
import { twMerge } from "tailwind-merge";

const FancyTooltip = ({
  payload,
  label,
  className,
}: TooltipProps<number, string> & { className?: string }) => {
  if (!payload?.length) return null;

  return (
    <div
      className={twMerge(
        "rounded-lg border bg-popover px-3 py-2 text-sm shadow",
        className
      )}
    >
      <div className="mb-1 font-medium">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          <span>{p.name}:</span>
          <span className="ml-auto font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

interface Props {
  patient: Patient;
}

export default function VitalsChart({ patient }: Props) {
  const data = patient.vitals.heartRate.map((hr, i) => {
    const bp = patient.vitals.bloodPressure[i];
    return {
      time: format(parseISO(hr.timestamp), "HH:mm"),
      heartRate: hr.value,
      systolic: bp?.systolic ?? null,
      diastolic: bp?.diastolic ?? null,
    };
  });

  const chartConfig = {
    heartRate: { label: "Heart rate (bpm)", color: "#38bdf8" },    // sky‑400
    systolic:  { label: "Systolic BP",       color: "#f87171" },    // red‑400
    diastolic: { label: "Diastolic BP",      color: "#4ade80" },    // green‑400
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      title="Vitals trend"
      className="h-[280px] w-full"
    >
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="heartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-heartRate)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-heartRate)" stopOpacity={0.05} />
            </linearGradient>
            <filter id="glass" x="-20%" width="140%" y="-20%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<FancyTooltip />} />

          <Bar
            dataKey="systolic"
            barSize={10}
            radius={[4, 4, 0, 0]}
            fill="var(--color-systolic)"
            fillOpacity={0.35}
            filter="url(#glass)"
            name={chartConfig.systolic.label}
          />
          <Bar
            dataKey="diastolic"
            barSize={10}
            radius={[4, 4, 0, 0]}
            fill="var(--color-diastolic)"
            fillOpacity={0.35}
            filter="url(#glass)"
            name={chartConfig.diastolic.label}
          />

          <Area
            type="monotone"
            dataKey="heartRate"
            stroke="var(--color-heartRate)"
            fill="url(#heartGradient)"
            strokeWidth={2}
            name={chartConfig.heartRate.label}
            dot={{ r: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
