// 2026, August 15th
// Edison, Justin, Joshua
// this component is the Navbar, which we've been creating variations since day one almost. It operates as a client-side component which uses next.js navigation hooks. the navbar adapts its styling based on the url pathname. the Navbar contains the logo, branding, and links to the home and movies pages.
//
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  //  usePathname is used to read the URL path to allow for dynamically styled links.
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isMovies = pathname.startsWith("/movies");

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#06111D]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-orange-500 text-2xl shadow-lg shadow-amber-500/30">
            🌍
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Cinema<span className="text-amber-400">Atlas</span>
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400">
              Discover Every Story
            </p>
          </div>
        </Link>
        {/* the dynamic render the home and movies links dynamically based on which page you are on. */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className={`relative py-4 text-sm font-medium transition ${
              isHome ? "text-white" : "text-slate-400 hover:text-amber-300"
            }`}
          >
            Home
            {isHome && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-400" />
            )}
          </Link>

          <Link
            href="/movies"
            className={`relative py-4 text-sm font-medium transition ${
              isMovies ? "text-white" : "text-slate-400 hover:text-amber-300"
            }`}
          >
            Movies
            {isMovies && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-400" />
            )}
          </Link>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="h-8 w-px bg-slate-700" />

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Explore the World of Cinema
            </p>
            {/* shows the 'est.2026' based on the size of the window the user is using. */}
            <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
              Est. 2026
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
