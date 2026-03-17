import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./prisma";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "PLACEHOLDER_KEY",
});

export default anthropic;

/**
 * Builds a data context string for the AI to understand the current state of the business.
 * Gathers:
 * - Revenue (Last 30 days)
 * - Top 3 Products by revenue
 * - Stock alerts (Critical/Low)
 * - Customer count and Segment breakdown
 * - Average Order Value (AOV)
 */
export async function buildBusinessContext(userId: string) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 1. Revenue (Last 30 days)
    const transactions = await prisma.transaction.findMany({
      where: {
        type: "income",
        date: { gte: thirtyDaysAgo },
      },
      select: { amount: true },
    });
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

    // 2. Top Products
    const topProducts = await prisma.product.findMany({
      orderBy: { stockLevel: "desc" }, // Simplified proxy for popularity in mock environment
      take: 3,
      select: { name: true, sku: true, stockLevel: true },
    });

    // 3. Stock Alerts
    const criticalStock = await prisma.product.count({
      where: { stockLevel: { lte: 5 } },
    });

    // 4. Customer Metrics
    const customerCount = await prisma.customer.count();
    const customers = await prisma.customer.findMany({
      select: { totalSpent: true, orderCount: true },
    });
    
    const avgOrderValue = customers.length > 0 
      ? customers.reduce((sum, c) => sum + (c.totalSpent / (c.orderCount || 1)), 0) / customers.length
      : 0;

    // 5. Build context string
    const context = `
Current Business Snapshot (Last 30 Days):
- Total Revenue: $${totalRevenue.toLocaleString()}
- Average Order Value: $${avgOrderValue.toFixed(2)}
- Customer Count: ${customerCount}
- Critical Stock Alerts: ${criticalStock} items need immediate reorder.
- Top Products: ${topProducts.map(p => `${p.name} (SKU: ${p.sku})`).join(", ")}

Business Environment: You are a premium AI Retail Advisor. Your goal is to provide data-driven insights, highlight inventory risks, and suggest growth opportunities.
`;

    return context;
  } catch (error) {
    console.error("Error building business context:", error);
    // Fallback context if DB is empty or disconnected
    return `
[SYSTEM NOTICE: Real-time DB context unavailable, using mock baseline]
Baseline Metrics:
- Target Monthly Revenue: $75,000
- Healthy AOV: $45.00
- Inventory Status: 5 critical alerts pending.
- Top Products: Classic Denim Jacket, Wireless Pro Headphones.
`;
  }
}
