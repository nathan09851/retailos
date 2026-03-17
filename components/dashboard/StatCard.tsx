"use client";

import CountUp from "react-countup";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface StatCardProps {
  name: string;
  value: number;
  chartData: { name: string; value: number }[];
}

const StatCard = ({ name, value, chartData }: StatCardProps) => {
  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-muted-foreground">{name}</h3>
      </div>
      <div className="mt-4">
        <CountUp
          start={0}
          end={value}
          duration={2}
          separator=","
          decimals={name === "Revenue" || name === "Profit" ? 2 : 0}
          prefix={name === "Revenue" || name === "Profit" ? "$" : ""}
          className="text-4xl font-bold"
        />
      </div>
      <div className="h-20 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
