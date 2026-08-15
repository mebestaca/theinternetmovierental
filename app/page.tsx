import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#06111D] text-white">

      <section className="flex min-h-115 items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl">

          <div className="mb-5 text-5xl">
            🌍
          </div>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to{" "}
            <span className="text-amber-400">
              Cinema Atlas
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Explore the world of cinema and discover movies from different
            genres, countries, and generations.
          </p>

          <Link
            href="/movies"
            className="mt-7 inline-block rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-300"
          >
            Browse Movies
          </Link>

        </div>
      </section>

      <section className="border-t border-slate-800 bg-[#0B1928] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Explore Cinema
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Discover stories without borders.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Cinema Atlas makes it easy to discover movies across genres,
              countries, and generations.
            </p>

          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-slate-800 bg-[#06111D] p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400/10 text-2xl">
                🎬
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Explore Genres
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Browse movies across action, drama, comedy, science fiction,
                horror, romance, and more.
              </p>

            </div>

            <div className="rounded-xl border border-slate-800 bg-[#06111D] p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400/10 text-2xl">
                🌎
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Discover Global Cinema
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore stories from different countries and experience cinema
                from cultures around the world.
              </p>

            </div>

            <div className="rounded-xl border border-slate-800 bg-[#06111D] p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400/10 text-2xl">
                ✦
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Find Something New
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Discover films you may have never encountered and find your
                next favorite movie.
              </p>

            </div>

          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">

        <div className="mx-auto max-w-3xl">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-xl">
            🌍
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Cinema Has No Borders
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Every film has a story.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Cinema Atlas brings the world of film together in one place,
            giving you a simple way to browse, discover, and explore movies
            from different eras, genres, and cultures.
          </p>

          <Link
            href="/movies"
            className="mt-6 inline-flex rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Explore the Collection
          </Link>

        </div>
      </section>

    </main>
  );
}