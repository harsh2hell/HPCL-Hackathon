import React from "react";
import { getCurrentUser, getComplaintFilterForUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ComplaintCard from "@/components/ComplaintCard";
import ComplaintFilingModal from "@/components/ComplaintFilingModal";
import { AlertTriangle, ShieldCheck, Filter } from "lucide-react";

export default async function ComplaintsPage() {
  const user = await getCurrentUser();
  const whereFilter = getComplaintFilterForUser(user);

  const complaints = await prisma.complaint.findMany({
    where: whereFilter,
    include: {
      outlet: true,
      reporter: {
        select: { id: true, name: true, role: true },
      },
    },
    orderBy: [
      { priority: "asc" }, // CRITICAL first
      { createdAt: "desc" },
    ],
  });

  const outlets = await prisma.outlet.findMany({
    select: { id: true, code: true, name: true, city: true },
    orderBy: { name: "asc" },
  });

  const criticalCount = complaints.filter((c) => c.priority === "CRITICAL").length;
  const highCount = complaints.filter((c) => c.priority === "HIGH").length;
  const mediumCount = complaints.filter((c) => c.priority === "MEDIUM").length;
  const lowCount = complaints.filter((c) => c.priority === "LOW").length;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Smart Complaint Triage Desk
            </h1>
            <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200">
              {complaints.length} Tickets in Scope
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complaints auto-categorized by severity, department, and SLA. Gas leaks and
            fire hazards are routed instantly to Safety Cell (&lt;4h turnaround).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ComplaintFilingModal
            outlets={outlets}
            userOutletId={user.outletId}
          />
        </div>
      </div>

      {/* RBAC scope badge banner */}
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Active RBAC View: <strong className="text-hpcl-yellow">{user.name}</strong> (
            {user.role}
            {user.region ? ` • ${user.region} Region` : ""})
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-red-400 font-bold">● {criticalCount} Critical</span>
          <span className="text-amber-400 font-bold">● {highCount} High</span>
          <span className="text-blue-400 font-bold">● {mediumCount} Medium</span>
          <span className="text-emerald-400 font-bold">● {lowCount} Low</span>
        </div>
      </div>

      {/* Complaint Cards Grid / List */}
      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
            <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Complaints Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              There are currently no active or historical grievances scoped to your user
              role. Use the button above to lodge a test grievance.
            </p>
          </div>
        ) : (
          complaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)
        )}
      </div>
    </div>
  );
}
