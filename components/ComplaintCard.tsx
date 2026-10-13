import React from "react";
import {
  AlertCircle,
  Clock,
  Building2,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export interface ComplaintData {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  priority: string;
  status: string;
  assignedDept: string;
  slaHours: number;
  source: string;
  createdAt: Date | string;
  resolvedAt?: Date | string | null;
  rationale?: string | null;
  suggestedAction?: string | null;
  outlet?: {
    code: string;
    name: string;
    city: string;
    region: string;
  } | null;
}

interface ComplaintCardProps {
  complaint: ComplaintData;
}

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  const priorityStyles: Record<
    string,
    { badge: string; border: string; icon: string }
  > = {
    CRITICAL: {
      badge: "bg-red-600 text-white shadow-xs animate-pulse-subtle",
      border: "border-red-300 bg-red-50/20",
      icon: "text-red-600",
    },
    HIGH: {
      badge: "bg-amber-600 text-white",
      border: "border-amber-200 bg-amber-50/20",
      icon: "text-amber-600",
    },
    MEDIUM: {
      badge: "bg-blue-600 text-white",
      border: "border-blue-200 bg-blue-50/20",
      icon: "text-blue-600",
    },
    LOW: {
      badge: "bg-emerald-600 text-white",
      border: "border-emerald-200 bg-emerald-50/20",
      icon: "text-emerald-600",
    },
  };

  const statusStyles: Record<string, { badge: string; text: string }> = {
    OPEN: {
      badge: "bg-red-100 text-red-800 border-red-200",
      text: "Open Ticket",
    },
    IN_PROGRESS: {
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      text: "In Progress",
    },
    RESOLVED: {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      text: "Resolved",
    },
  };

  const pStyle = priorityStyles[complaint.priority] || priorityStyles.MEDIUM;
  const sStyle = statusStyles[complaint.status] || statusStyles.OPEN;

  const createdDate = new Date(complaint.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  let resolutionDurationHours: number | null = null;
  if (complaint.resolvedAt) {
    const res = new Date(complaint.resolvedAt).getTime();
    const cre = new Date(complaint.createdAt).getTime();
    resolutionDurationHours = Number(((res - cre) / (1000 * 3600)).toFixed(1));
  }

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xs transition hover:shadow-md bg-white ${pStyle.border}`}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${pStyle.badge}`}
          >
            {complaint.priority}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${sStyle.badge}`}
          >
            {sStyle.text}
          </span>
          <span className="text-xs font-mono text-slate-600 font-semibold">
            #{complaint.id.substring(0, 12)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
          <span className="flex items-center gap-1 font-semibold text-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            SLA: {complaint.slaHours}h
          </span>
          {resolutionDurationHours !== null && (
            <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Resolved in {resolutionDurationHours}h
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-3">
        <h4 className="text-base font-bold text-slate-900">{complaint.title}</h4>
        <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
          {complaint.description}
        </p>

        {/* Outlet & Department Information */}
        <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {complaint.outlet
                ? `${complaint.outlet.name} (${complaint.outlet.city})`
                : "Central Grievance"}
            </span>
          </div>
          <div className="text-slate-400">•</div>
          <div>
            <span className="text-slate-600 font-semibold">Dept: </span>
            <span className="font-semibold text-slate-900">{complaint.assignedDept}</span>
          </div>
          <div className="text-slate-400">•</div>
          <div className="text-slate-600 font-medium">
            Logged: <span className="text-slate-800 font-semibold">{createdDate}</span>
          </div>
        </div>

        {/* AI / Heuristic Triage Rationale Box */}
        {complaint.rationale && (
          <div className="mt-3 rounded-xl bg-blue-50/60 border border-blue-100 p-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-700" />
              <span>Smart Triage Rationale</span>
            </div>
            <p className="mt-1 text-slate-700 leading-normal">
              {complaint.rationale}
            </p>
          </div>
        )}

        {/* Suggested Action */}
        {complaint.suggestedAction && (
          <div className="mt-2 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ArrowRight className="w-3.5 h-3.5 text-hpcl-red" />
              <span>Recommended Operational Action</span>
            </div>
            <p className="mt-1 text-slate-700 leading-normal whitespace-pre-line font-mono text-[11px]">
              {complaint.suggestedAction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
