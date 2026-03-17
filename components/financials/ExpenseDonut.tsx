"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { ExpenseCategory } from "./types";

interface ExpenseDonutProps {
  data: ExpenseCategory[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  const total = payload[0].payload.total;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-muted-foreground">${value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">{((value / total) * 100).toFixed(1)}% of total</p>
    </div>
  );
};

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: any) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ExpenseDonut({ data }: ExpenseDonutProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const enriched = data.map((d) => ({ ...d, total }));

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-sm mb-4">Expense Breakdown</h3>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={enriched}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={900}
            >
              {enriched.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
          {enriched.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-muted-foreground truncate">{d.name}</span>
              <span className="font-semibold ml-auto">${(d.value / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>

        {/* Center total */}
        <div className="text-center mt-3">
          <p className="text-xs text-muted-foreground">Total Expenses</p>
          <p className="text-lg font-bold">${total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
