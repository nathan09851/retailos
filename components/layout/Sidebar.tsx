"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
  Sparkles,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Inventory", icon: ShoppingCart, href: "/dashboard/inventory" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
  { name: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
  { name: "AI Assistant", icon: Sparkles, href: "/dashboard/ai" },
  { name: "Financials", icon: BarChart, href: "/dashboard/financials" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <motion.div
      className={`relative bg-card text-card-foreground transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-electric-blue"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8.3a2.4 2.4 0 0 0-3.4 0" />
              <path d="M15.3 11.7a2.4 2.4 0 0 0-3.4 0" />
              <path d="M11.9 15.1a2.4 2.4 0 0 0-3.4 0" />
            </svg>
            <h1 className="text-xl font-bold">RetailOS</h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-secondary"
        >
          <ChevronLeft
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-4 p-4 mx-2 rounded-lg hover:bg-secondary transition-colors duration-200"
          >
            <item.icon className="w-6 h-6 text-electric-purple" />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          {!isCollapsed && (
            <div>
              <p className="font-semibold">Admin User</p>
              <p className="text-sm text-muted-foreground">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
