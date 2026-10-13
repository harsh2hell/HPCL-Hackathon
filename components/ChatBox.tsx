"use client";

import React, { useState } from "react";
import {
  Send,
  Mic,
  Bot,
  User,
  BookOpen,
  Sparkles,
  WifiOff,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface Citation {
  docTitle: string;
  category: string;
  source: string;
  score: number;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  citations?: Citation[];
  isOffline?: boolean;
  notFound?: boolean;
}

export default function ChatBox() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text:
        language === "hi"
          ? "नमस्ते! मैं एचपी मित्र हूँ — हिंदुस्तान पेट्रोलियम का आधिकारिक एआई सहायक। आप मुझसे एलपीजी सुरक्षा एसओपी, डीलर मार्जिन, ईंधन गुणवत्ता जांच अथवा ईवी चार्जिंग नियमों के बारे में पूछ सकते हैं।"
          : "Namaste! I am HP Mitra — HPCL's official AI Copilot. Ask me about LPG leak SOPs, dealer commission schemes, fuel quality testing, or EV charging standards.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offlineNotice, setOfflineNotice] = useState(false);

  const sampleQuestions = [
    {
      en: "What to do if there's an LPG leak?",
      hi: "एलपीजी गैस रिसाव होने पर क्या करें?",
    },
    {
      en: "What's the new dealer margin scheme?",
      hi: "नया डीलर मार्जिन कमीशन क्या है?",
    },
    {
      en: "What are the EV charging station guidelines?",
      hi: "ईवी चार्जिंग स्टेशन के दिशानिर्देश क्या हैं?",
    },
    {
      en: "How to perform the filter paper test for petrol?",
      hi: "पेट्रोल के लिए फिल्टर पेपर टेस्ट कैसे करें?",
    },
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend, language }),
      });

      const data = await res.json();
      if (data.offlineFallback) {
        setOfflineNotice(true);
      }

      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        text: data.answer || "No response received.",
        citations: data.citations || [],
        isOffline: data.offlineFallback,
        notFound: data.notFound,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: "assistant",
          text:
            language === "hi"
              ? "नेटवर्क त्रुटि के कारण उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।"
              : "Unable to retrieve answer due to connection error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      {/* Copilot Header */}
      <div className="bg-gradient-to-r from-[#003873] to-[#0B2545] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Bot className="w-6 h-6 text-hpcl-yellow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">HP Mitra Copilot</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40">
                Grounding Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {t(
                "copilotDesc",
                "Answers strictly from 15 ingested HPCL operational manuals. Never hallucinates."
              )}
            </p>
          </div>
        </div>

        {offlineNotice && (
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-200 text-xs px-2.5 py-1 rounded-lg border border-amber-500/30">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Keyword Fallback</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-hpcl-red" />
          {language === "hi" ? "त्वरित प्रश्न:" : "Quick Queries:"}
        </span>
        {sampleQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(language === "hi" ? sq.hi : sq.en)}
            disabled={isLoading}
            className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-hpcl-blue px-3 py-1 rounded-full border border-slate-200 whitespace-nowrap transition shadow-2xs font-medium"
          >
            {language === "hi" ? sq.hi : sq.en}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.sender === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-[#003873] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-xs ${
                m.sender === "user"
                  ? "bg-[#003873] text-white rounded-tr-xs"
                  : "bg-white text-slate-900 border border-slate-200 rounded-tl-xs"
              }`}
            >
              <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                {m.text}
              </div>

              {/* Citations Box */}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    <BookOpen className="w-3 h-3 text-hpcl-blue" />
                    <span>Verified HPCL Sources:</span>
                  </div>
                  <div className="space-y-1">
                    {m.citations.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 bg-slate-50 px-2.5 py-1 rounded-md text-[11px] border border-slate-100"
                      >
                        <span className="font-semibold text-slate-700 truncate">
                          [{c.docTitle}]
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                          {c.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Offline badge inside message */}
              {m.isOffline && (
                <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                  <WifiOff className="w-3 h-3" />
                  <span>AI Offline Fallback • Exact keyword document match</span>
                </div>
              )}
            </div>

            {m.sender === "user" && (
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-lg bg-[#003873] text-white flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
              <span className="animate-pulse">Searching HPCL documents & synthesizing answer...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input controls */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice button placeholder with strict requirement label */}
          <button
            type="button"
            title="Voice input is reserved for Phase 2"
            onClick={() =>
              alert("Voice input is in development for Phase 2 (Hindi & English).")
            }
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition border border-slate-200 flex items-center gap-1 text-xs"
          >
            <Mic className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">
              Voice (coming soon)
            </span>
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t(
              "askPlaceholder",
              "Ask in Hindi or English (e.g., LPG leak SOP, dealer margin, EV guidelines)..."
            )}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-hpcl-blue focus:bg-white transition"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-[#003873] hover:bg-[#002347] disabled:bg-slate-300 text-white px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
