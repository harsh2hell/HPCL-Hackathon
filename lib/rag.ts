import { prisma } from "./db";
import { genAI, GEMINI_MODELS, isGeminiAvailable } from "./gemini";

export interface RetrievedChunk {
  docTitle: string;
  category: string;
  chunkText: string;
  chunkIndex: number;
  score: number;
  source: string;
}

/**
 * Splits document content into overlapping chunks (~750-850 characters).
 */
export function chunkDocument(
  text: string,
  chunkSize: number = 800,
  overlap: number = 150
): string[] {
  if (!text || text.trim().length === 0) return [];
  const clean = text.replace(/\r\n/g, "\n");
  const chunks: string[] = [];
  let start = 0;

  while (start < clean.length) {
    let end = start + chunkSize;
    if (end >= clean.length) {
      chunks.push(clean.substring(start).trim());
      break;
    }

    // Try to break at a paragraph or sentence boundary
    const nextNewline = clean.lastIndexOf("\n\n", end);
    const nextSentence = clean.lastIndexOf(". ", end);
    if (nextNewline > start + 300) {
      end = nextNewline + 2;
    } else if (nextSentence > start + 300) {
      end = nextSentence + 1;
    }

    chunks.push(clean.substring(start, end).trim());
    start = Math.max(start + 1, end - overlap);
  }

  return chunks.filter((c) => c.length > 30);
}

/**
 * Generates vector embedding for text using text-embedding-004 or mock fallback.
 */
export async function getEmbedding(text: string): Promise<number[] | null> {
  if (!isGeminiAvailable() || !genAI) {
    return null; // Signals offline mode
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.embedding });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (err) {
    console.warn("Embedding generation failed:", (err as Error).message);
    return null;
  }
}

/**
 * Cosine similarity between two float arrays.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Offline keyword search over ingested chunks when AI is offline.
 */
export async function offlineKeywordSearch(
  query: string,
  limit: number = 4
): Promise<RetrievedChunk[]> {
  const terms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const chunks = await prisma.documentChunk.findMany({
    include: {
      doc: true,
    },
  });

  const scored = chunks.map((c) => {
    const lower = (c.chunkText + " " + c.doc.title + " " + c.doc.category).toLowerCase();
    let score = 0;
    for (const term of terms) {
      const occurrences = (lower.match(new RegExp(term, "g")) || []).length;
      if (occurrences > 0) {
        score += occurrences * (lower.includes(c.doc.title.toLowerCase()) ? 2.5 : 1.0);
      }
    }
    return {
      docTitle: c.doc.title,
      category: c.doc.category,
      chunkText: c.chunkText,
      chunkIndex: c.chunkIndex,
      score: score > 0 ? Math.min(score / (terms.length * 3), 0.95) : 0,
      source: c.doc.source,
    };
  });

  return scored
    .filter((item) => item.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
