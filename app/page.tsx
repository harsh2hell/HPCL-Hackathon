import React from "react";
import Link from "next/link";
import {
  Bot,
  AlertTriangle,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { computeOutletAnalytics } from "@/lib/analytics";
import { prisma } from "@/lib/db";
import StatCard from "@/components/StatCard";

export default async function HomePage() {
  const user = await getCurrentUser();
  const analytics = await computeOutletAnalytics(user);
  const docCount = await prisma.knowledgeDoc.count();
  const chunkCount = await prisma.documentChunk.count();
  const outletCount = await prisma.outlet.count();

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Banner with HPCL branding */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003873] via-[#0B2545] to-[#133B70] text-white p-8 sm:p-10 shadow-xl border border-blue-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-hpcl-yellow border border-white/20">
            <Flame className="w-3.5 h-3.5 text-hpcl-red" />
            <span>HP Power Lab 3.0 • Flagship Prototype Entry</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            HP MITRA <span className="text-[#D9252A]">✦</span> HP Copilot
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
            One unified AI assistant for everyone in HPCL's ecosystem — dealers, outlet
            staff, consumers, and regional managers. Grounded in 15 official HPCL
            manuals, automated emergency triage, and strictly computed database analytics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/copilot"
              className="bg-[#D9252A] hover:bg-[#B01B20] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Ask HPCL Copilot</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/complaints"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Smart Triage Desk</span>
            </Link>

            <Link
              href="/analytics"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Live Outlet Analytics</span>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-radial from-red-500 to-transparent" />
      </div>

      {/* Live Operational Metrics from DB */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-hpcl-blue" />
            <span>Live System Metrics (Strictly Computed from Database)</span>
          </h2>
          <span className="text-xs font-mono bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md border border-blue-200 font-semibold">
            Role Scope: {user.role} ({user.name.split(" ")[0]})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="HPCL Knowledge Base"
            value={`${docCount} Docs`}
            subtitle={`${chunkCount} indexed chunks with citations`}
            icon={BookOpen}
            variant="blue"
          />
          <StatCard
            title="Retail & LPG Outlets"
            value={outletCount}
            subtitle="Across North, South, East, West"
            icon={Layers}
            variant="slate"
          />
          <StatCard
            title="Complaints In Scope"
            value={analytics.totalComplaints}
            subtitle={`${analytics.openCount} Open • ${analytics.resolvedCount} Resolved`}
            icon={AlertTriangle}
            variant={analytics.criticalCount > 0 ? "red" : "amber"}
          />
          <StatCard
            title="Avg Resolution Time"
            value={
              analytics.avgResolutionHours !== null
                ? `${analytics.avgResolutionHours} hrs`
                : null
            }
            subtitle="Computed from resolved tickets (SLA <48h)"
            icon={Clock}
            variant="green"
            isZeroState={analytics.avgResolutionHours === null}
          />
        </div>
      </div>

      {/* The 3 Core Pillars Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          The 3 Pillars of HP Mitra
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: ASK HPCL */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-hpcl-blue">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Ask HPCL — RAG Copilot
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bilingual AI assistant (Hindi & English) for dealers, staff, and customers.
                Answers ONLY from ingested HPCL circulars and SOPs with exact document
                citations. Built-in offline fallback when API keys are unconfigured.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero hallucination constraint</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exact citation badges [Doc, Section]</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Keyword fallback if offline</span>
                </li>
              </ul>
            </div>

            <Link
              href="/copilot"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-hpcl-blue font-bold text-xs rounded-xl transition border border-blue-200"
            >
              <span>Test RAG Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: SMART COMPLAINT TRIAGE */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-hpcl-red">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Smart Complaint Triage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly classifies grievances by priority, category, department, and
                SLA. Safety issues (gas smell, leak, forecourt fire) trigger instant
                CRITICAL priority &lt;4h turnaround with explainable triage rationale.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Safety Hazards = CRITICAL (&lt;4h SLA)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Deterministic offline rule heuristics</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Structured JSON output with rationale</span>
                </li>
              </ul>
            </div>

            <Link
              href="/complaints"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 hover:bg-red-100 text-hpcl-red font-bold text-xs rounded-xl transition border border-red-200"
            >
              <span>Explore Smart Triage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: OUTLET ANALYTICS */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                3. Live Outlet Analytics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time operational dashboard computed 100% from live database records.
                No hardcoded averages, no fake stats. Full RBAC scoping ensuring dealers
                see only their outlet and managers see their region.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Resolution times computed from timestamps</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Strict API & UI RBAC isolation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero-state handling for missing telemetry</span>
                </li>
              </ul>
            </div>

            <Link
              href="/analytics"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl transition border border-emerald-200"
            >
              <span>View Outlet Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
