"use client";

import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#003873] flex items-center justify-center text-white font-bold text-xs">
              HP
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                HP MITRA — Hindustan Petroleum Copilot
              </p>
              <p className="text-[11px] text-slate-400">
                HP Power Lab 3.0 • Tagline: "Your perspective. Our next possibility."
              </p>
            </div>
          </div>

          {/* Mandatory Demo Data Notice Banner */}
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-[11px] font-medium shadow-sm">
            <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
            <span>
              {t("demoBanner", "Demo data for judging — not real HPCL data")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Role-Based Access Control (RBAC) Active</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[10px] text-slate-400">
          Built with Next.js 14 App Router, TypeScript, Prisma & Google Gemini API • Offline Fallback Enabled
        </div>
      </div>
    </footer>
  );
}
