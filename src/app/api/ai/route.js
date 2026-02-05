import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { z } from "zod";
import { ChatGroq } from "@langchain/groq";

// ---- ZOD SCHEMA ----
const AiSchema = z.object({
  title: z.string(),
  summary: z.string(),
  html: z.string(),
  features: z.array(z.string()).optional(),
  data: z.record(z.any()).optional(),
});

export async function POST(req) {
  try {
    // ---- AUTH ----
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { success: false, message: "Prompt required" },
        { status: 400 }
      );
    }

    // ---- INIT GROQ ----
    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "openai/gpt-oss-120b", // or llama3-70b
      temperature: 0.4,
    });

    // ---- FORCE STRICT JSON ----
    const systemPrompt = `
You are a JSON-only API.

Return ONLY valid JSON.
NO markdown.
NO explanations.
NO comments.

Schema:
{
  "title": string,
  "summary": string,
  "html": string,
  "features"?: string[],
  "data"?: object
}

Rules:
- html MUST be a full standalone HTML file with css header footer and dont use character /n or other in code or text and make ui clean proffesinal
- Inline CSS & JS only
- Responsive modern UI
`;

    const response = await llm.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ]);

    // ---- PARSE JSON ----
    let parsed;
    try {
      parsed = JSON.parse(response.content);
    } catch (err) {
      console.error("RAW AI OUTPUT:", response.content);
      throw new Error("AI returned invalid JSON");
    }

    // ---- VALIDATE ----
    const result = AiSchema.parse(parsed);

    return NextResponse.json(
      { success: true, result },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI Generation Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}
