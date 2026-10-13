"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Bot,
  AlertTriangle,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Languages,
} from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";
import { useLanguage } from "./LanguageContext";

interface NavbarProps {
  currentUserId: string;
  userRole: string;
}

export default function Navbar({ currentUserId, userRole }: NavbarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: "Overview", icon: Flame, matchExact: true },
    { href: "/copilot", label: "Ask HPCL Copilot", icon: Bot },
    { href: "/complaints", label: "Smart Triage", icon: AlertTriangle },
    { href: "/analytics", label: "Live Analytics", icon: BarChart3 },
    { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
    ...(userRole === "ADMIN"
      ? [{ href: "/admin", label: "HQ Admin", icon: ShieldCheck, badge: "Admin" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-[#003873] via-[#0B2545] to-[#D9252A] px-4 py-1 text-[11px] font-medium flex items-center justify-between text-slate-100">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-1.5 py-0.2 rounded font-bold tracking-wider text-[10px]">
            HP POWER LAB 3.0
          </span>
          <span>Hindustan Petroleum Corporation Ltd • Innovation Track</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-300">
            {t("tagline", "One AI assistant for dealers, staff, customers & regional managers")}
          </span>
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded text-[11px] font-semibold text-white transition"
            title="Toggle Hindi / English"
          >
            <Languages className="w-3 h-3 text-hpcl-yellow" />
            <span>{language === "en" ? "हिंदी में देखें" : "Switch to English"}</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003873] to-[#D9252A] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <span className="font-black text-lg tracking-tighter text-white">
                HP<span className="text-[#D9252A]">✦</span>
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-white group-hover:text-slate-100">
                HP MITRA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-hpcl-blue-light/40 text-blue-300 px-1.5 py-0.5 rounded">
                Copilot
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
              {language === "hi" ? "एचपीसीएल एकीकृत एआई सहायक" : "Unified Enterprise Assistant"}
            </p>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.matchExact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#003873] text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] bg-red-600/80 text-white font-bold px-1 rounded ml-0.5">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <RoleSwitcher currentUserId={currentUserId} />
        </div>
      </div>
    </header>
  );
}
