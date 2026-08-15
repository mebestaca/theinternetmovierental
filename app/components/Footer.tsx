import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#06111D] text-slate-300">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-xl shadow-lg shadow-amber-500/10">
                🌍
              </div>

              <h2 className="text-xl font-bold tracking-wide text-white">
                Cinema<span className="text-amber-400">Atlas</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              An online movie catalog that helps users discover and explore
              films from around the world.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Information
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/about"
                className="text-slate-400 transition hover:text-amber-400"
              >
                About
              </Link>

              <Link
                href="/faq"
                className="text-slate-400 transition hover:text-amber-400"
              >
                FAQ / Help
              </Link>

              <Link
                href="/privacy"
                className="text-slate-400 transition hover:text-amber-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-slate-400 transition hover:text-amber-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-4 text-sm">
              <a
                href="mailto:contact@cinemaatlas.com"
                className="text-slate-400 transition hover:text-amber-400"
              >
                contact@cinemaatlas.com
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-center text-xs text-slate-600">
            © 2026 Cinema Atlas. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}