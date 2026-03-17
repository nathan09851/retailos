import { NextRequest, NextResponse } from "next/server";
import anthropic, { buildBusinessContext } from "@/lib/ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.email || "guest"; // Using email as user identifier for now

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Build the dynamic business context for the system prompt
    const businessContext = await buildBusinessContext(userId);

    const systemPrompt = `
You are an intelligent business advisor for RetailOS. 
${businessContext}
Answer questions concisely, highlight risks, and suggest specific actions. 
Always remain professional, encouraging, and data-driven.
If the user asks for things outside of business analytics, politely steer them back.
`;

    // Create a streaming response
    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      stream: true,
    });

    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response", details: error.message },
      { status: 500 }
    );
  }
}
