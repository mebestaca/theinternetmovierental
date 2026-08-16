// 2026, August 15th
// Edison, Justin, Joshua
// this component is used to add a placeholder content section to unfinished pages. This component works by accepting parameters for how the comming soon section should look so that way the format of the comming soon content is standard but the content can be tailored to the respective pages. it also provides a form for each page to notify the user of when the page will be finished.
//
"use client";

import { useState } from "react";
import Link from "next/link";

// defines the inputs and optional properties for all peieces of the component
interface ComingSoonProps {
  title?: string;
  accent?: string;
  eyebrow?: string;
  description?: string;
  icon?: string;
  backHref?: string;
  backLabel?: string;
  onNotify?: (email: string) => void | Promise<void>;
}

export default function ComingSoon({
  title = "Coming",
  accent = "Soon",
  eyebrow = "Now in production",
  description = "This page is currently in the works. Leave your email and we'll let you know the moment it's ready.",
  icon = "🎬",
  backHref = "/",
  backLabel = "Back to home",
  onNotify,
}: ComingSoonProps) {
  // initializes email input and submission tracking
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // handles form submission, logic, input validation, triggers the notification callback, and updates submission UI state.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await onNotify?.(email);
    setSubmitted(true);
  };

  return (
    // bunch-o-stylin'
    <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#06111D] px-8 py-24 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-144` w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-amber-400/20 via-orange-500/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] bg-size-[32px_32px] opacity-40" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 text-3xl shadow-lg shadow-amber-500/30">
          {icon}
        </div>

        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.4em] text-amber-400">
          {eyebrow}
        </p>

        <h1 className="mt-4 text-5xl font-bold leading-tight tracking-wide sm:text-6xl">
          {title} <span className="text-amber-400">{accent}</span>
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
          {description}
        </p>
        {/* this checks if an email has been submitted, and determines whether to show an email submission form or success message */}
        {submitted ? (
          <div className="mt-10 rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-4 text-sm font-medium text-amber-300">
            {"You're on the list — we'll be in touch."}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full flex-1 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-linear-to-br from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-[#06111D] shadow-lg shadow-amber-500/30 transition hover:brightness-105 active:brightness-95"
            >
              Notify me
            </button>
          </form>
        )}

        <div className="mt-14 flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
          <span className="h-px w-10 bg-slate-700" />
          {/* adding a link back */}
          <Link href={backHref} className="transition hover:text-amber-300">
            {backLabel}
          </Link>
          <span className="h-px w-10 bg-slate-700" />
        </div>
      </div>
    </section>
  );
}
