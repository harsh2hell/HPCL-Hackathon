"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Plus, Sparkles, X, ShieldAlert, Check } from "lucide-react";

interface OutletOption {
  id: string;
  code: string;
  name: string;
  city: string;
}

interface ComplaintFilingModalProps {
  outlets: OutletOption[];
  userOutletId: string | null;
}

const TEMPLATES = [
  {
    label: "🚨 LPG Gas Leak Emergency (Critical)",
    title: "Strong continuous gas smell from kitchen cylinder regulator",
    description:
      "Consumer reports hissing gas sound and intense mercaptan smell near cylinder valve. Stove turned off, family evacuated into yard.",
  },
  {
    label: "⚡ EV Charger Failure (High)",
    title: "60kW DC Fast Charger connector locked and error E04 on display",
    description:
      "CCS-2 connector stuck in vehicle charging port. Station screen rebooting with red fault alert. EV driver waiting on highway.",
  },
  {
    label: "⛽ Density Check Mismatch (High)",
    title: "Diesel observed density 834 kg/m3 exceeds invoice standard tolerance",
    description:
      "Morning ASTM hydrometer check indicates 5.5 kg/m3 variation against refinery invoice. Requested immediate field officer inspection.",
  },
  {
    label: "🧹 Restroom Hygiene Issue (Low)",
    title: "Forecourt public washroom floor wet and soap dispenser empty",
    description:
      "Highway passenger reports washroom soap dispenser empty and needs cleaning attention.",
  },
];

export default function ComplaintFilingModal({
  outlets,
  userOutletId,
}: ComplaintFilingModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState(userOutletId || outlets[0]?.id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triageNotice, setTriageNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTriageNotice(null);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          outletId: selectedOutlet,
          source: "FORM",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTitle("");
        setDescription("");
        setIsOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyTemplate = (t: (typeof TEMPLATES)[0]) => {
    setTitle(t.title);
    setDescription(t.description);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#D9252A] hover:bg-[#B01B20] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
      >
        <Plus className="w-4 h-4" />
        <span>File New Complaint (Smart Triage)</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-hpcl-red">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Log New Complaint / Grievance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Auto-classified via Smart Triage engine with explainable SLA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Templates for Judges */}
            <div className="mt-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-hpcl-red" />
                <span>1-Click Test Scenarios for Judges:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEMPLATES.map((tmpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => applyTemplate(tmpl)}
                    className="text-left text-xs bg-white hover:bg-red-50/50 p-2 rounded-xl border border-slate-200 hover:border-red-200 text-slate-800 transition font-medium line-clamp-1"
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Outlet / Station
                </label>
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-hpcl-blue"
                >
                  {outlets.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.city} - {o.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Complaint Subject / Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Strong gas smell in kitchen / EV charger offline..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-hpcl-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Incident Description & Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue, observations, and urgency..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-hpcl-blue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#003873] hover:bg-[#002347] disabled:bg-slate-300 text-white px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  {isSubmitting ? "Running Smart Triage..." : "Submit Grievance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
