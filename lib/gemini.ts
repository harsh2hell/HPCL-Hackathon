import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY?.trim() || "";

// Safe initialization
export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const GEMINI_MODELS = {
  chat: "gemini-1.5-flash",
  fast: "gemini-1.5-flash",
  embedding: "text-embedding-004",
};

/**
 * Checks if Gemini API is configured and accessible.
 */
export function isGeminiAvailable(): boolean {
  return Boolean(apiKey && apiKey.length > 5);
}

/**
 * Safely calls Gemini Flash with temperature 0.0 for deterministic classification/RAG.
 */
export async function generateContentSafe(
  prompt: string,
  systemInstruction?: string
): Promise<{ text: string; offlineFallback: boolean }> {
  if (!genAI) {
    return {
      text: "",
      offlineFallback: true,
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODELS.chat,
      generationConfig: {
        temperature: 0.0,
      },
      systemInstruction,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      text: response.text() || "",
      offlineFallback: false,
    };
  } catch (error) {
    console.warn("Gemini API call failed, falling back to offline mode:", (error as Error).message);
    return {
      text: "",
      offlineFallback: true,
    };
  }
}
