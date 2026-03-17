import { NextRequest, NextResponse } from "next/server";
import anthropic, { buildBusinessContext } from "@/lib/ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.email || "guest";

    const businessContext = await buildBusinessContext(userId);

    const prompt = `
Based on the following business context, provide a 30-day revenue forecast.
DATA CONTEXT:
${businessContext}

Your response MUST be a JSON object with the following structure:
{
  "predicted_revenue": number,
  "confidence": number (0-1),
  "key_factors": string[],
  "recommendations": string[]
}
Return ONLY the JSON. No conversational text.
`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response as JSON");
    }

    const forecastData = JSON.parse(jsonMatch[0]);

    return NextResponse.json(forecastData);
  } catch (error: any) {
    console.error("AI Forecast Error:", error);
    return NextResponse.json(
      { error: "Failed to generate forecast", details: error.message },
      { status: 500 }
    );
  }
}
