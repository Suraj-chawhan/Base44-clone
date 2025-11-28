import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dotenv from "dotenv";

import { z } from "zod";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

export async function POST(req) {
  try {
    // ---- AUTH ----
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt required" },
        { status: 400 }
      );
    }

    // ---- Init Groq Model ----
    const llm = new ChatGroq({
      model: "llama3-70b-8192", // or mixtral-8x7b if you want
      apiKey: process.env.GROQ_API_KEY,
      temperature: 0.4,
    });

    // ---- Structured Output Schema ----
    const schema = z.object({
      title: z.string(),
      summary: z.string(),
      html: z.string().describe(
        "Full standalone HTML including inline CSS & JavaScript. Must run without external files."
      ),
      features: z.array(z.string()).optional(),
      data: z.record(z.any()).optional(),
    });

    // ---- Attach structure enforcement ----
    const structuredModel = llm.withStructuredOutput(schema);

    // ---- RUN AI ----
    const result = await structuredModel.invoke(`
      Create a fully working UI based on this instruction:

      "${prompt}"

      Rules:
      - Produce a complete HTML file in one string (inline CSS + JS).
      - UI must be responsive and modern.
      - If functionality required (example: todo list), include working JS logic.
      - Output must follow schema EXACTLY. No extra text.
    `);

    return NextResponse.json(
      {
        success: true,
        result,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
