import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.financialEvent.findMany({
      orderBy: { date: 'asc' },
    });
    
    // Fallback seed mechanism: If no events are in DB, let's insert the INITIAL_EVENTS from the frontend so the user has some data.
    if (events.length === 0) {
      console.log("No financial events found, seeding initial data...");
      const MOCK_EVENTS = [
        { date: "2026-03-28", title: "Staff Payroll", type: "payroll", amount: 14000 },
        { date: "2026-03-31", title: "Q1 Tax Estimate Due", type: "tax", amount: 8200 },
        { date: "2026-04-01", title: "Supplier Invoice – TechSupply", type: "supplier", amount: 7800 },
        { date: "2026-04-07", title: "SaaS Subscriptions", type: "subscription", amount: 650 },
        { date: "2026-04-10", title: "Revenue Milestone Q1", type: "milestone", amount: 75000 },
        { date: "2026-04-15", title: "Staff Payroll", type: "payroll", amount: 14000 },
        { date: "2026-04-20", title: "Office Rent Due", type: "supplier", amount: 2400 },
        { date: "2026-04-25", title: "Insurance Premium", type: "subscription", amount: 480 },
        { date: "2026-04-30", title: "Monthly Tax Filing", type: "tax", amount: 3100 },
        { date: "2026-05-01", title: "Spring Revenue Target", type: "milestone", amount: 90000 },
      ];
      
      await prisma.financialEvent.createMany({
        data: MOCK_EVENTS,
      });
      
      const newlySeeded = await prisma.financialEvent.findMany({
        orderBy: { date: 'asc' },
      });
      
      return NextResponse.json(newlySeeded);
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch financial events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, title, type, amount } = body;

    if (!date || !title || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newEvent = await prisma.financialEvent.create({
      data: {
        date,
        title,
        type,
        amount: amount ? Number(amount) : null,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Failed to create financial event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
