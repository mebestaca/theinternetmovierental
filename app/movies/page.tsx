// 2026, August 15th
// Edison, Justin, Joshua
// This is the movies page which handles the CRUD interface on this website. This page fetches remote db records from supabase when the page is loaded initially and gets user inputs when a user interacts with the website. It also maps our the supabase data into local state objects, handles the filtering, and date sorting algorithims  on the client side. This page processes asynchronous db operations with form validation as well. The page renders the movie catalog with live search controls, dynamic grid cards for every movie, and a clear filters button. It also includes a new movie creation form for addding movies to the catalog.
//
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type Movie = {
  id: number;
  title: string;
  image: string;
  releaseDate: string;
  genre: string;
  actors: string[];
};

const genreColors: Record<string, string> = {
  Action: "bg-red-500/10 text-red-400 border-red-500/20",
  Adventure: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Animation: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Comedy: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Crime: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  Documentary: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Drama: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Fantasy: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Horror: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Mystery: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Romance: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
  "Science Fiction": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Thriller: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  War: "bg-stone-500/10 text-stone-300 border-stone-500/20",
  Western: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function MoviesPage() {
  // Movies
  const [movies, setMovies] = useState<Movie[]>([]);

  // Search and filters
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [actors, setActors] = useState("");

  // Supbase
  const supabase = createClient();

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("release_date", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const formattedMovies: Movie[] = data.map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.image,
      releaseDate: movie.release_date,
      genre: movie.genre,
      actors: movie.actors,
    }));

    setMovies(formattedMovies);
  }

  function openAddForm() {
    setEditingMovieId(null);

    setTitle("");
    setReleaseDate("");
    setGenre("");
    setImage("");
    setActors("");

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function openEditForm(movie: Movie) {
    setEditingMovieId(movie.id);

    setTitle(movie.title);
    setReleaseDate(movie.releaseDate);
    setGenre(movie.genre);
    setImage(movie.image);
    setActors(movie.actors.join(", "));

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function closeForm() {
    setShowForm(false);
    setEditingMovieId(null);

    setTitle("");
    setReleaseDate("");
    setGenre("");
    setImage("");
    setActors("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const movieData = {
      title,
      releaseDate,
      genre,
      image,
      actors: actors
        .split(",")
        .map((actor) => actor.trim())
        .filter((actor) => actor !== ""),
    };

    if (editingMovieId !== null) {
      const { error } = await supabase
        .from("movies")
        .update({
          title,
          image,
          release_date: releaseDate,
          genre,
          actors: actors
            .split(",")
            .map((actor) => actor.trim())
            .filter((actor) => actor !== ""),
        })
        .eq("id", editingMovieId);

      if (error) {
        console.error(error);
        return;
      }

      await loadMovies();
    } else {
      const { error } = await supabase.from("movies").insert({
        title,
        image,
        release_date: releaseDate,
        genre,
        actors: actors
          .split(",")
          .map((actor) => actor.trim())
          .filter((actor) => actor !== ""),
      });

      if (error) {
        console.error(error);
        return;
      }

      await loadMovies();
    }

    closeForm();
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?",
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from("movies").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    await loadMovies();
  }

  const filteredMovies = movies
    .filter((movie) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        movie.title.toLowerCase().includes(searchText) ||
        movie.actors.some((actor) => actor.toLowerCase().includes(searchText));

      const matchesGenre = genreFilter === "All" || movie.genre === genreFilter;

      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      }

      return 0;
    });

  return (
    <main className="min-h-screen bg-[#06111D] px-6 py-10 text-white">
      {/* PAGE HEADER */}
      <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Cinema Atlas Collection
          </p>

          <h1 className="text-4xl font-bold tracking-tight">Movies</h1>

          <p className="mt-2 text-slate-400">
            Discover and explore movies from around the world.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          + Add Movie
        </button>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="mx-auto mb-8 max-w-7xl rounded-xl border border-slate-800 bg-[#0B1928] p-5">
        <div className="grid gap-4 md:grid-cols-3">
          {/* SEARCH */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Search Movies
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title or actor..."
                className="w-full rounded-lg border border-slate-700 bg-[#06111D] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-amber-400"
              />
            </div>
          </div>

          {/* GENRE */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Genre
            </label>

            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none focus:border-amber-400"
            >
              <option value="All">All Genres</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Animation">Animation</option>
              <option value="Comedy">Comedy</option>
              <option value="Crime">Crime</option>
              <option value="Documentary">Documentary</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Thriller">Thriller</option>
              <option value="War">War</option>
              <option value="Western">Western</option>
            </select>
          </div>

          {/* SORT */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sort By
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none focus:border-amber-400"
            >
              <option value="newest">Newest Releases</option>
              <option value="oldest">Oldest Releases</option>
            </select>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mt-4 border-t border-slate-800 pt-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredMovies.length}
            </span>{" "}
            {filteredMovies.length === 1 ? "movie" : "movies"}
          </p>
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="mx-auto mb-8 max-w-7xl rounded-xl border border-slate-800 bg-[#0B1928] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                {editingMovieId !== null ? "Edit Movie" : "New Movie"}
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {editingMovieId !== null
                  ? "Update movie information"
                  : "Add a new movie"}
              </h2>
            </div>

            <button
              onClick={closeForm}
              className="text-2xl text-slate-500 transition hover:text-white"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Movie Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title"
                required
                className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400"
              />
            </div>

            {/* RELEASE DATE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Release Date
              </label>

              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none focus:border-amber-400"
              />
            </div>

            {/* GENRE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none focus:border-amber-400"
              >
                <option value="">Select Genre</option>

                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Thriller">Thriller</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
              </select>
            </div>

            {/* POSTER URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Poster URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                required
                className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400"
              />
            </div>

            {/* ACTORS */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Actors
              </label>

              <input
                type="text"
                value={actors}
                onChange={(e) => setActors(e.target.value)}
                placeholder="Actor 1, Actor 2, Actor 3"
                required
                className="w-full rounded-lg border border-slate-700 bg-[#06111D] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400"
              />

              <p className="mt-2 text-xs text-slate-600">
                Separate actor names with commas.
              </p>
            </div>

            {/* FORM BUTTONS */}
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                {editingMovieId !== null ? "Save Changes" : "Add Movie"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MOVIE GRID */}
      {filteredMovies.length > 0 ? (
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group overflow-hidden rounded-xl border border-slate-800 bg-[#0B1928] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl"
            >
              {/* POSTER */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0B1928] via-transparent to-transparent" />
              </div>

              {/* MOVIE INFORMATION */}
              <div className="p-5">
                <h2 className="truncate text-xl font-bold">{movie.title}</h2>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      genreColors[movie.genre] ||
                      "border-slate-700 bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {movie.genre}
                  </span>

                  <span className="text-sm text-slate-500">
                    {movie.releaseDate}
                  </span>
                </div>

                {/* ACTORS */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Cast
                  </p>

                  <div className="space-y-1">
                    {movie.actors.map((actor) => (
                      <p key={actor} className="text-sm text-slate-300">
                        {actor}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-6 flex gap-3 border-t border-slate-800 pt-4">
                  <button
                    onClick={() => openEditForm(movie)}
                    className="flex-1 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="flex-1 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* NO RESULTS */
        <div className="mx-auto max-w-7xl rounded-xl border border-dashed border-slate-800 py-16 text-center">
          <div className="text-5xl">🎬</div>

          <h2 className="mt-5 text-xl font-semibold">No movies found</h2>

          <p className="mt-2 text-slate-500">
            Try changing your search or filter.
          </p>
          {/* clear filters button  */}
          <button
            onClick={() => {
              setSearch("");
              setGenreFilter("All");
              setSortBy("newest");
            }}
            className="mt-6 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
