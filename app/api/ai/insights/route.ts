import { NextRequest, NextResponse } from "next/server";
import anthropic, { buildBusinessContext } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.email || "guest";

    const businessContext = await buildBusinessContext(userId);

    const prompt = `
Generate exactly 3 concise business insights for this retail store based on the data below.
${businessContext}

Categories:
1. RISK: Inventory or financial danger.
2. OPPORTUNITY: Untapped growth or optimization.
3. ACTION: Immediate task for the manager.

Return a JSON array of objects:
[
  {"type": "risk", "content": "string"},
  {"type": "opportunity", "content": "string"},
  {"type": "action", "content": "string"}
]
Return ONLY the JSON.
`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response as JSON array");
    }

    const insights = JSON.parse(jsonMatch[0]);

    // Store insights in the database
    const savedInsights = await Promise.all(
      insights.map((insight: any) =>
        prisma.aIInsight.create({
          data: {
            type: insight.type,
            content: insight.content,
          },
        })
      )
    );

    return NextResponse.json({
      message: "Insights generated and stored successfully",
      insights: savedInsights,
    });
  } catch (error: any) {
    console.error("AI Insights Error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights", details: error.message },
      { status: 500 }
    );
  }
}
