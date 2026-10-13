import React from "react";
import ChatBox from "@/components/ChatBox";
import { BookOpen, ShieldCheck, Cpu, HelpCircle, FileText } from "lucide-react";
import { prisma } from "@/lib/db";
import { isGeminiAvailable } from "@/lib/gemini";

export default async function CopilotPage() {
  const docs = await prisma.knowledgeDoc.findMany({
    select: { id: true, title: true, category: true, source: true },
    take: 6,
  });
  const online = isGeminiAvailable();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Ask HPCL — RAG Copilot</span>
            <span className="text-xs bg-[#003873] text-white px-2.5 py-0.5 rounded-full font-mono">
              v1.0 Demo
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Grounded enterprise AI answering strictly from 15 ingested HPCL documents.
            No hallucinations. Citations provided for every fact.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold border ${
              online
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                online ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {online ? "Gemini Online" : "Keyword Fallback Active (Offline Safe)"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Copilot Chat Window (2 cols) */}
        <div className="lg:col-span-2">
          <ChatBox />
        </div>

        {/* Knowledge & Grounding Sidebar (1 col) */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Grounding & Anti-Hallucination</span>
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              HP Mitra does not guess. If a question is not found in the indexed HPCL
              manuals, it explicitly declines to answer and directs the user to the 24x7
              helpline (1906 / 1800-233-3555) or Smart Grievance desk.
            </p>
            <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-600">
                <span className="font-bold text-hpcl-blue">1.</span>
                <span>Deterministic extraction at temperature 0.0</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="font-bold text-hpcl-blue">2.</span>
                <span>Exact bracketed citation: [Doc Title]</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="font-bold text-hpcl-blue">3.</span>
                <span>Bilingual understanding (English & Hindi)</span>
              </div>
            </div>
          </div>

          {/* Sample Ingested Manuals */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-hpcl-blue" />
              <span>Ingested Reference Circulars</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Sample of 15 operational documents indexed in the local database:
            </p>
            <div className="mt-3 space-y-2">
              {docs.map((d) => (
                <div
                  key={d.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <p className="font-semibold text-slate-800 line-clamp-1">{d.title}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {d.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
