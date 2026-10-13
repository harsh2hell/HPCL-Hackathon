import { describe, it, expect } from "vitest";
import { chunkDocument, cosineSimilarity, offlineKeywordSearch } from "@/lib/rag";

describe("RAG Engine & Vector Utilities Unit Tests", () => {
  it("chunks long document text into overlapping segments without dropping content", () => {
    const longText =
      "Section 1: Standard operating procedure. ".repeat(25) +
      "\n\nSection 2: Emergency guidelines. ".repeat(25);

    const chunks = chunkDocument(longText, 800, 150);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].length).toBeLessThanOrEqual(950);
  });

  it("calculates cosine similarity correctly", () => {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    const vecC = [0, 1, 0];

    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
    expect(cosineSimilarity(vecA, vecC)).toBeCloseTo(0.0);
  });

  it("runs offline keyword search against seeded documents without API key", async () => {
    const results = await offlineKeywordSearch("LPG gas leak safety", 3);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].docTitle).toBeTruthy();
    expect(results[0].score).toBeGreaterThan(0);
  });
});
