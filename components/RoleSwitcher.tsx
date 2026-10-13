"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ChevronDown, Check, UserCircle2 } from "lucide-react";

interface RoleSwitcherProps {
  currentUserId: string;
}

const USERS = [
  {
    id: "user-admin-1",
    label: "HPCL HQ Admin",
    name: "Rajesh Sharma",
    role: "ADMIN",
    badge: "All HPCL Access",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    id: "user-mgr-north",
    label: "Regional Head (North)",
    name: "Vikram Malhotra",
    role: "MANAGER",
    badge: "North Region Scope",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "user-dlr-delhi",
    label: "Dealer - Delhi Central",
    name: "Sunil Verma",
    role: "DEALER",
    badge: "Outlet HP-DEL-001 Only",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    id: "user-dlr-mumbai",
    label: "Dealer - Mumbai West",
    name: "Pooja Kulkarni",
    role: "DEALER",
    badge: "Outlet HP-MUM-001 Only",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: "user-cust-1",
    label: "HP Gas Customer",
    name: "Amit Kumar",
    role: "CUSTOMER",
    badge: "Personal Tickets Only",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export default function RoleSwitcher({ currentUserId }: RoleSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = USERS.find((u) => u.id === currentUserId) || USERS[2];

  const handleSelect = async (userId: string) => {
    if (userId === currentUser.id) {
      setIsOpen(false);
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/auth/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to switch role", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-850 text-white rounded-lg border border-slate-700 text-xs transition shadow-sm"
        title="Switch simulated user role to test RBAC"
      >
        <Shield className="w-3.5 h-3.5 text-hpcl-yellow" />
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-100">{currentUser.label}</span>
            <span
              className={`px-1.5 py-0.2 text-[10px] rounded font-medium border ${currentUser.badgeColor}`}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
        <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-2xl border border-slate-200 py-2 z-50 text-slate-800">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Simulate RBAC Persona (Judge Controls)
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Switch users to test strict access isolation across Outlets and Regions.
              </p>
            </div>

            <div className="py-1">
              {USERS.map((user) => {
                const isSelected = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => handleSelect(user.id)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      isSelected ? "bg-blue-50/70 font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle2
                        className={`w-4 h-4 ${
                          isSelected ? "text-hpcl-blue" : "text-slate-400"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-slate-900">{user.label}</div>
                        <div className="text-[11px] text-slate-500">
                          {user.name} •{" "}
                          <span className="text-[10px] text-slate-600 font-mono">
                            {user.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-hpcl-blue flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
