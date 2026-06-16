"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DistributionChartProps {
  data: Array<{ month: string; primary: number; secondary: number; branches: number }>;
}

export function DistributionChart({ data }: DistributionChartProps) {
  return (
    <div className="h-72 mt-5 -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8C6B1F" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#8C6B1F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gBranches" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5BA88A" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#5BA88A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{
              background: "rgba(8,32,30,0.95)",
              border: "1px solid rgba(212,175,55,0.35)",
              borderRadius: 4,
              fontSize: 12,
            }}
            labelStyle={{ color: "#D4AF37", fontWeight: 600 }}
            formatter={(v: number) => [`${v} kg`, ""]}
          />
          <Area type="monotone" dataKey="primary" name="Primary Alliances" stroke="#D4AF37" strokeWidth={2} fill="url(#gPrimary)" />
          <Area type="monotone" dataKey="secondary" name="Secondary Partners" stroke="#8C6B1F" strokeWidth={2} fill="url(#gSecondary)" />
          <Area type="monotone" dataKey="branches" name="Branches" stroke="#5BA88A" strokeWidth={2} fill="url(#gBranches)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
