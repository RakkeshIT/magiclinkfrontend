"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

// ── Icons ──────────────────────────────────────
const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const ZapIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── Dashboard ──────────────────────────────────
const DashboardLayout: any = ({Logout}: any) => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      Logout()
      router.push("/user-auth");
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-200 overflow-x-hidden font-sans">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 h-16 bg-[#080a0f]/85 backdrop-blur-xl border-b border-white/[0.06]">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            M
          </div>
          <span className="font-semibold text-[17px] tracking-tight text-white hidden sm:block">
            MagicAuth
          </span>
        </div>

        {/* Groq badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-medium">
          <ZapIcon size={12} />
          <span className="hidden sm:inline">Powered by</span> Groq AI
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 text-sm font-medium transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/[0.08] hover:text-red-400 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className={loggingOut ? "animate-spin" : "transition-transform duration-200 group-hover:translate-x-0.5"}>
            <LogOutIcon />
          </span>
          <span>{loggingOut ? "Signing out…" : "Sign out"}</span>
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">

        {/* Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl" />

        {/* Eyebrow */}
        <div className="relative inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full border border-violet-500/30 bg-violet-500/[0.08] text-violet-400 text-xs font-medium tracking-widest uppercase animate-[fadeUp_0.5s_ease_0.1s_both]">
          <LinkIcon />
          Magic Link Authentication
        </div>

        {/* Heading */}
        <h1 className="relative font-bold text-white tracking-tight leading-[1.08] mb-5 max-w-2xl animate-[fadeUp_0.5s_ease_0.2s_both]"
            style={{ fontSize: "clamp(36px,6vw,60px)", letterSpacing: "-1.5px" }}>
          Passwordless auth,{" "}
          <span className="bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            lightning fast.
          </span>
        </h1>

        {/* Description */}
        <p className="relative text-base text-slate-500 leading-relaxed max-w-md mb-12 animate-[fadeUp_0.5s_ease_0.3s_both]">
          This project demonstrates secure Magic Link authentication — no passwords,
          no friction. Just a link to your inbox and you're in.
        </p>

        {/* CTAs */}
        <div className="relative flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto animate-[fadeUp_0.5s_ease_0.4s_both]">
          <Link
            href="/groq-form"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] active:translate-y-0"
          >
            <ZapIcon size={14} />
            Try queation Generator AI
            <ArrowRightIcon />
          </Link>

          <a
            href="https://rakkeshaifolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 text-sm font-medium transition-all duration-200 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ExternalLinkIcon />
            View Portfolio
          </a>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── FEATURE CARDS ── */}
      <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-[fadeUp_0.5s_ease_0.55s_both]">

        <div className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/20 hover:bg-violet-500/[0.04] transition-all duration-200">
          <div className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center text-base mb-4">
            🔗
          </div>
          <p className="text-sm font-semibold text-slate-200 mb-2 tracking-tight">One-click login</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Users receive a secure, time-limited link — no password required. Tap once and they're authenticated.
          </p>
        </div>

        <div className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/20 hover:bg-blue-500/[0.04] transition-all duration-200">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center text-base mb-4">
            ⚡
          </div>
          <p className="text-sm font-semibold text-slate-200 mb-2 tracking-tight">Groq-powered AI</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            The fastest LLM inference available. Groq's LPU hardware delivers sub-second responses at scale.
          </p>
        </div>

        <div className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/20 hover:bg-cyan-500/[0.04] transition-all duration-200">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-base mb-4">
            🛡️
          </div>
          <p className="text-sm font-semibold text-slate-200 mb-2 tracking-tight">JWT + RBAC secure</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Token-based sessions with role-based access control keep every route protected by default.
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="text-center px-6 py-8 text-xs text-slate-600 border-t border-white/[0.04]">
        Built with Next.js · Express · MongoDB · Groq AI &nbsp;·&nbsp;
        <a
          href="https://rakkeshaifolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-500 hover:text-violet-400 transition-colors"
        >
          rakkeshaifolio.vercel.app
        </a>
      </footer>

      {/* ── Keyframes (Tailwind arbitrary animation) ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;