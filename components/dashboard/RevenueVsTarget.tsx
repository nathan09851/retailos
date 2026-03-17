"use client";

import { motion } from "framer-motion";

interface RevenueVsTargetProps {
  data: {
    current: number;
    target: number;
  };
}

const RevenueVsTarget = ({ data }: RevenueVsTargetProps) => {
  const percentage = (data.current / data.target) * 100;

  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-muted-foreground">
        Revenue vs Target
      </h3>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${data.current.toLocaleString()}</span>
          <span>${data.target.toLocaleString()}</span>
        </div>
        <div className="relative w-full h-4 mt-2 bg-secondary rounded-full">
          <motion.div
            className="absolute h-4 bg-electric-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueVsTarget;
