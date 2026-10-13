import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number | null;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "blue" | "red" | "amber" | "green" | "slate";
  isZeroState?: boolean;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "blue",
  isZeroState = false,
}: StatCardProps) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50/60 border-blue-200",
      iconBg: "bg-blue-600 text-white",
      text: "text-blue-950",
    },
    red: {
      bg: "bg-red-50/60 border-red-200",
      iconBg: "bg-red-600 text-white",
      text: "text-red-950",
    },
    amber: {
      bg: "bg-amber-50/60 border-amber-200",
      iconBg: "bg-amber-600 text-white",
      text: "text-amber-950",
    },
    green: {
      bg: "bg-emerald-50/60 border-emerald-200",
      iconBg: "bg-emerald-600 text-white",
      text: "text-emerald-950",
    },
    slate: {
      bg: "bg-slate-50 border-slate-200",
      iconBg: "bg-slate-700 text-white",
      text: "text-slate-900",
    },
  };

  const theme = colorMap[variant];

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${theme.bg}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
          {title}
        </span>
        <div className={`p-2 rounded-xl shadow-xs ${theme.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3">
        {value === null || isZeroState ? (
          <div className="py-1">
            <span className="text-2xl font-bold text-slate-400">--</span>
            <p className="text-[11px] text-amber-700 font-medium mt-1">
              Live telemetry unavailable
            </p>
          </div>
        ) : (
          <div>
            <div className={`text-3xl font-extrabold tracking-tight ${theme.text}`}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-700 mt-1 font-medium">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
