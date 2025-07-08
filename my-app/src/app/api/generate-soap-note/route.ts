// app/api/generate-soap-note/route.ts

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// instantiate OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: `${process.env.OPENAI_ENDPOINT}/openai/deployments/${process.env.OPENAI_DEPLOYMENT}`,
  defaultHeaders: {
    "api-key": process.env.OPENAI_API_KEY!,
  },
  defaultQuery: {
    "api-version": process.env.OPENAI_API_VERSION!,
  },
});

// log env variables on cold start
console.log("🔎 ENV CHECK", {
  endpoint: process.env.OPENAI_ENDPOINT,
  deployment: process.env.OPENAI_DEPLOYMENT,
  version: process.env.OPENAI_API_VERSION,
  apiKey: process.env.OPENAI_API_KEY?.slice(0, 6) + "..."
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transcript = body?.transcript;

    console.log("📝 Received transcript:", transcript?.slice(0, 300));

    if (!transcript || transcript.length < 10) {
      console.warn("⚠️ Transcript missing or too short");
      return NextResponse.json(
        { error: "Transcript too short or missing" },
        { status: 400 }
      );
    }

    const prompt = `
You are a licensed therapist creating SOAP notes from session transcripts. Based on the following transcript, return a JSON object with this format:

{
  "subjective": "...",
  "objective": "...",
  "assessment": "...",
  "plan": "..."
}

Only return valid JSON. Transcript:
"""${transcript}"""
`;

    console.log("📤 Sending prompt to Azure OpenAI...");

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_DEPLOYMENT!,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: "You are an expert therapist and clinical documentation assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("✅ Azure request sent, awaiting response...");

    const text = completion.choices[0].message?.content ?? "{}";

    console.log("✅ Azure OpenAI raw response:", text?.slice(0, 300));

    let soapNote;
    try {
      soapNote = JSON.parse(text);
      console.log("✅ Parsed SOAP note JSON successfully");
    } catch (e) {
      console.error("❌ Failed to parse SOAP note JSON:", text);
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ soapNote });
  } catch (err: any) {
    console.error("❌ generate-soap-note error:", {
      message: err.message,
      stack: err.stack,
      details: err?.response?.data || null,
    });
    return NextResponse.json(
      {
        error: err.message || "Failed to generate SOAP note",
        details: err?.response?.data || err?.stack || "Unknown error",
      },
      { status: 500 }
    );
  }
}
