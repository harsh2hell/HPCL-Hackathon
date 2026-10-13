import React from "react";
import { prisma } from "@/lib/db";
import { BookOpen, FileText, CheckCircle2, Search, ExternalLink } from "lucide-react";

export default async function KnowledgeBasePage() {
  const docs = await prisma.knowledgeDoc.findMany({
    include: {
      _count: {
        select: { chunks: true },
      },
    },
    orderBy: { category: "asc" },
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>HPCL Grounded Knowledge Base</span>
            <span className="text-xs bg-[#003873] text-white px-2.5 py-0.5 rounded-full font-mono">
              {docs.length} Official Manuals
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Grounded source documentation for HP Mitra Copilot RAG pipeline. Every answer
            is cited directly from these manuals.
          </p>
        </div>
      </div>

      {/* Grid of Knowledge Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docs.map((doc) => {
          const wordCount = doc.content.split(/\s+/).length;

          return (
            <div
              key={doc.id}
              className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-hpcl-blue px-2.5 py-1 rounded-full border border-blue-200">
                    {doc.category.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {doc._count.chunks} Chunks
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                  Source: {doc.source}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>~{wordCount} words</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Indexed & Active
                  </span>
                </div>
              </div>

              <details className="mt-4 pt-2 border-t border-slate-100 group">
                <summary className="text-xs font-bold text-hpcl-blue cursor-pointer hover:underline list-none flex items-center justify-between">
                  <span>Preview SOP Sections</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 text-slate-700 text-xs font-mono max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-slate-200">
                  {doc.content}
                </div>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}
