import { NextResponse } from "next/server";
import { offlineKeywordSearch, RetrievedChunk } from "@/lib/rag";
import { generateContentSafe, isGeminiAvailable } from "@/lib/gemini";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { query, language = "en" } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const user = await getCurrentUser();

    // 1. Retrieve most relevant document chunks from DB
    const chunks: RetrievedChunk[] = await offlineKeywordSearch(query, 4);

    if (chunks.length === 0) {
      const fallbackMsg =
        language === "hi"
          ? "मुझे अपने पास उपलब्ध आधिकारिक एचपीसीएल दस्तावेजों में इसका उत्तर नहीं मिला। कृपया अधिक जानकारी के लिए एचपीसीएल हेल्पलाइन 1800-233-3555 पर संपर्क करें अथवा हमारे स्मार्ट शिकायत पोर्टल पर शिकायत दर्ज करें।"
          : "I don't find this in the HPCL documents I have. Please contact the 24x7 HPCL Helpline at 1800-233-3555 or file a ticket through our Smart Grievance portal.";

      return NextResponse.json({
        answer: fallbackMsg,
        citations: [],
        offlineFallback: true,
        notFound: true,
      });
    }

    // 2. Synthesize answer with citations
    const isOnline = isGeminiAvailable();
    let answerText = "";
    let isOffline = !isOnline;

    if (isOnline) {
      const contextBlocks = chunks
        .map(
          (c, idx) =>
            `[Source ${idx + 1}: ${c.docTitle}]\n${c.chunkText}`
        )
        .join("\n\n---\n\n");

      const systemPrompt = `You are HP Mitra, the official AI Copilot for Hindustan Petroleum Corporation Limited (HPCL).
Answer the user's question accurately using ONLY the provided HPCL source documents below.
CRITICAL RULES:
- Never hallucinate facts or invent policies.
- Every claim must cite the specific source document title in brackets, like: [Doc Title].
- Respond in ${language === "hi" ? "Hindi" : "English"}.
- If the question cannot be answered from the sources, state clearly that it is not documented in the provided material.`;

      const userPrompt = `HPCL Source Documents:\n${contextBlocks}\n\nUser Question: ${query}`;

      const res = await generateContentSafe(userPrompt, systemPrompt);
      if (!res.offlineFallback && res.text) {
        answerText = res.text;
      } else {
        isOffline = true;
      }
    }

    // Offline synthesis fallback
    if (isOffline || !answerText) {
      const topChunk = chunks[0];
      answerText =
        language === "hi"
          ? `एचपीसीएल आधिकारिक संदर्भ (${topChunk.docTitle}):\n\n${topChunk.chunkText.substring(0, 400)}...\n\n[संदर्भ: ${topChunk.docTitle}]`
          : `According to HPCL documentation (${topChunk.docTitle}):\n\n${topChunk.chunkText.substring(0, 420)}...\n\n[Citation: ${topChunk.docTitle}]`;
    }

    const citations = chunks.map((c) => ({
      docTitle: c.docTitle,
      category: c.category,
      source: c.source,
      score: Number(c.score.toFixed(2)),
    }));

    // Record interaction in DB
    try {
      await prisma.chatMessage.create({
        data: {
          userId: user.id,
          role: "USER",
          content: query,
        },
      });
      await prisma.chatMessage.create({
        data: {
          userId: user.id,
          role: "ASSISTANT",
          content: answerText,
          citations: JSON.stringify(citations),
          intent: "HPCL_POLICY_RAG",
        },
      });
    } catch {
      // Non-critical logging
    }

    return NextResponse.json({
      answer: answerText,
      citations,
      offlineFallback: isOffline,
      notFound: false,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Copilot query failed", details: (err as Error).message },
      { status: 500 }
    );
  }
}
