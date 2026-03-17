"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/dashboard/StatCard";
import TodayAtAGlance from "@/components/dashboard/TodayAtAGlance";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AiInsight from "@/components/dashboard/AiInsight";
import RevenueVsTarget from "@/components/dashboard/RevenueVsTarget";
import SkeletonCard from "@/components/dashboard/SkeletonCard";

interface DashboardData {
  stats: {
    name: string;
    value: number;
    chartData: { name: string; value: number }[];
  }[];
  todayAtAGlance: {
    name: string;
    value: string | number;
  }[];
  recentActivity: {
    type: string;
    description: string;
    time: string;
  }[];
  aiInsight: string;
  revenueVsTarget: {
    current: number;
    target: number;
  };
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.stats.map((stat) => (
        <motion.div key={stat.name} variants={itemVariants}>
          <StatCard {...stat} />
        </motion.div>
      ))}
      <motion.div className="col-span-1 md:col-span-2 lg:col-span-2" variants={itemVariants}>
        <TodayAtAGlance data={data.todayAtAGlance} />
      </motion.div>
      <motion.div className="col-span-1 md:col-span-2 lg:col-span-2" variants={itemVariants}>
        <RecentActivity data={data.recentActivity} />
      </motion.div>
      <motion.div className="col-span-1 md:col-span-2 lg:col-span-4" variants={itemVariants}>
        <AiInsight insight={data.aiInsight} />
      </motion.div>
      <motion.div className="col-span-1 md:col-span-2 lg:col-span-4" variants={itemVariants}>
        <RevenueVsTarget data={data.revenueVsTarget} />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
