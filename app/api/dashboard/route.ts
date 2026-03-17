import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    stats: [
      {
        name: "Revenue",
        value: 12456.78,
        chartData: [
          { name: "Jan", value: 3000 },
          { name: "Feb", value: 4200 },
          { name: "Mar", value: 5800 },
          { name: "Apr", value: 4500 },
          { name: "May", value: 7200 },
          { name: "Jun", value: 6800 },
        ],
      },
      {
        name: "Orders",
        value: 1234,
        chartData: [
          { name: "Jan", value: 200 },
          { name: "Feb", value: 250 },
          { name: "Mar", value: 320 },
          { name: "Apr", value: 280 },
          { name: "May", value: 400 },
          { name: "Jun", value: 380 },
        ],
      },
      {
        name: "Profit",
        value: 4321.98,
        chartData: [
          { name: "Jan", value: 1000 },
          { name: "Feb", value: 1500 },
          { name: "Mar", value: 2000 },
          { name: "Apr", value: 1800 },
          { name: "May", value: 2500 },
          { name: "Jun", value: 2300 },
        ],
      },
      {
        name: "Stock Alerts",
        value: 12,
        chartData: [
          { name: "Jan", value: 5 },
          { name: "Feb", value: 8 },
          { name: "Mar", value: 6 },
          { name: "Apr", value: 9 },
          { name: "May", value: 12 },
          { name: "Jun", value: 10 },
        ],
      },
    ],
    todayAtAGlance: [
      { name: "New Customers", value: 12 },
      { name: "Abandoned Carts", value: 3 },
      { name: "Top Selling Item", value: "Product X" },
    ],
    recentActivity: [
      { type: "order", description: "Order #1234 placed", time: "5m ago" },
      { type: "order", description: "Order #1233 placed", time: "10m ago" },
      { type: "stock", description: "Product Y is low on stock", time: "12m ago" },
      { type: "order", description: "Order #1232 placed", time: "15m ago" },
      { type: "stock", description: "Product Z is out of stock", time: "20m ago" },
    ],
    aiInsight: "Your best selling product is Product X. Consider running a promotion to boost sales further.",
    revenueVsTarget: {
      current: 75000,
      target: 100000,
    },
  };

  return NextResponse.json(data);
}
