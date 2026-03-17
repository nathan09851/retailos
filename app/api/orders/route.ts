import { NextResponse } from "next/server";

const orders = [
  {
    id: "#1234",
    customer: "John Doe",
    items: 3,
    total: 125.0,
    profitMargin: 25,
    status: "Delivered",
    date: "2024-03-15",
  },
  {
    id: "#1235",
    customer: "Jane Smith",
    items: 1,
    total: 45.5,
    profitMargin: 35,
    status: "Shipped",
    date: "2024-03-14",
  },
  {
    id: "#1236",
    customer: "Bob Johnson",
    items: 5,
    total: 250.0,
    profitMargin: 15,
    status: "Processing",
    date: "2024-03-14",
  },
  {
    id: "#1237",
    customer: "Alice Williams",
    items: 2,
    total: 80.0,
    profitMargin: 30,
    status: "Pending",
    date: "2024-03-13",
  },
  {
    id: "#1238",
    customer: "Charlie Brown",
    items: 1,
    total: 25.0,
    profitMargin: 40,
    status: "Cancelled",
    date: "2024-03-12",
  },
];

export async function GET() {
  return NextResponse.json(orders);
}
