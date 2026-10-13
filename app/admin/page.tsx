import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  ShieldAlert,
  ShieldCheck,
  Building,
  Users,
  BookOpen,
  AlertTriangle,
  Lock,
} from "lucide-react";

export default async function AdminPage() {
  const user = await getCurrentUser();

  // Strict RBAC Enforcement on UI
  if (user.role !== "ADMIN") {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-red-200 rounded-3xl shadow-lg text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Access Restricted — HPCL HQ Admin Only
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          In compliance with strict Role-Based Access Control (RBAC), the Admin Portal is
          accessible exclusively to HPCL Headquarters Administrators.
        </p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
          Current Active Persona: <strong>{user.name}</strong> ({user.role})
        </div>
        <p className="text-xs text-slate-500">
          To inspect HQ Admin features, click the <strong>Persona Switcher</strong> in the top
          navigation header and switch to <strong>HPCL HQ Admin (Rajesh Sharma)</strong>.
        </p>
      </div>
    );
  }

  // Admin access granted: fetch complete system data
  const outlets = await prisma.outlet.findMany({
    include: {
      dealer: { select: { name: true, email: true } },
      _count: { select: { complaints: true } },
    },
    orderBy: { region: "asc" },
  });

  const users = await prisma.user.findMany({
    include: {
      outlet: { select: { name: true, code: true } },
      _count: { select: { complaints: true } },
    },
    orderBy: { role: "asc" },
  });

  const docCount = await prisma.knowledgeDoc.count();
  const chunkCount = await prisma.documentChunk.count();

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>HPCL Corporate HQ Admin Console</span>
            <span className="text-xs bg-purple-700 text-white px-2.5 py-0.5 rounded-full font-mono">
              Unrestricted HQ View
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Centrally manage all 12 retail outlets, user RBAC permissions, and knowledge
            base documentation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-bold border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated: {user.name}</span>
          </span>
        </div>
      </div>

      {/* Outlets Table */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-4 h-4 text-hpcl-blue" />
          <span>All 12 Registered Outlets & Retail Stations</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/50">
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3">Station Name</th>
                <th className="py-2.5 px-3">Region</th>
                <th className="py-2.5 px-3">City</th>
                <th className="py-2.5 px-3">Facility Type</th>
                <th className="py-2.5 px-3">Assigned Dealer</th>
                <th className="py-2.5 px-3 text-right">Complaints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {outlets.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-hpcl-blue">
                    {o.code}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{o.name}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {o.region}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{o.city}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-700">
                      {o.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {o.dealer ? o.dealer.name : "Unassigned"}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                    {o._count.complaints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users & RBAC Roster */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Active Users & Role Authorization Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/50">
                <th className="py-2.5 px-3">User Name</th>
                <th className="py-2.5 px-3">Email ID</th>
                <th className="py-2.5 px-3">RBAC Role</th>
                <th className="py-2.5 px-3">Region Scope</th>
                <th className="py-2.5 px-3">Assigned Outlet</th>
                <th className="py-2.5 px-3 text-right">Tickets</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{u.name}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{u.email}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : u.role === "MANAGER"
                          ? "bg-blue-100 text-blue-800"
                          : u.role === "DEALER"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {u.region ? `${u.region}` : "All"}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                    {u.outlet ? `${u.outlet.name} (${u.outlet.code})` : "Global HQ"}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                    {u._count.complaints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
