"use client";

import { useState } from "react";

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
    "Science Fiction":
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Thriller: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    War: "bg-stone-500/10 text-stone-300 border-stone-500/20",
    Western: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "Die Hard",
    image:
      "https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
    releaseDate: "1988-07-20",
    genre: "Action",
    actors: [
      "Bruce Willis",
      "Alan Rickman",
      "Bonnie Bedelia",
      "Reginald VelJohnson",
    ],
  },

  {
    id: 2,
    title: "Jumanji: Welcome to the Jungle",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLr1qVKhCy8dRRs1MJZje_UOQ_ExL7bz8CaHr7ofqQsz5j7QrLBxgtIWFKcY6H-NxExd2Hng&s=10",
    releaseDate: "2017-12-20",
    genre: "Adventure",
    actors: [
      "Dwayne Johnson",
      "Kevin Hart",
      "Jack Black",
      "Karen Gillan",
    ],
  },

  {
    id: 3,
    title: "Coco",
    image:
      "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    releaseDate: "2017-11-22",
    genre: "Animation",
    actors: [
      "Anthony Gonzalez",
      "Gael García Bernal",
      "Benjamin Bratt",
      "Alanna Ubach",
    ],
  },

  {
    id: 4,
    title: "The Hangover",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_QVbb_2BXCjG3AO4VXa56n0MOojFs2f2xVnNM8nDnSrsa6M4IUnbRFPQg5lqe4bcmmg9&s=10",
    releaseDate: "2009-06-05",
    genre: "Comedy",
    actors: [
      "Bradley Cooper",
      "Ed Helms",
      "Zach Galifianakis",
      "Justin Bartha",
    ],
  },

  {
    id: 5,
    title: "The Godfather",
    image:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    releaseDate: "1972-03-24",
    genre: "Crime",
    actors: [
      "Marlon Brando",
      "Al Pacino",
      "James Caan",
      "Robert Duvall",
    ],
  },

  {
    id: 6,
    title: "The Last Dance",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2XqnNxJPvvLMiRjxBw-1cRCapgbMM6D6u6hfV3x149sideMBhkNsnRlv5zxLiUFFCL74gA&s=10",
    releaseDate: "2020-04-19",
    genre: "Documentary",
    actors: [
      "Michael Jordan",
      "Scottie Pippen",
      "Dennis Rodman",
      "Phil Jackson",
    ],
  },

  {
    id: 7,
    title: "The Shawshank Redemption",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGnXtIxFhLVDu_Y9e4WV8J10B0Itb-DHdSGZINXmi0Zt1gWfmBKhJ3dJm04_vHdASVK2-Uw&s=10",
    releaseDate: "1994-09-23",
    genre: "Drama",
    actors: [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton",
      "William Sadler",
    ],
  },

  {
    id: 8,
    title: "Fantastic Beasts and Where to Find Them",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQurmPI4ZiNLF13uYDrQV02-oAZcx3Zv5x0bxByymSj0ek1YWG9Q0CfvAFMhlbDsx9rtz&s=10",
    releaseDate: "2016-11-18",
    genre: "Fantasy",
    actors: [
      "Eddie Redmayne",
      "Katherine Waterston",
      "Dan Fogler",
      "Colin Farrell",
    ],
  },

  {
    id: 9,
    title: "The Exorcist",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv5TdxmHstX3epjWwfiKBjBQ_lA4AFAFSbveVUBvvusGO2MSdv9zijmfgBHQe6M132m2l3pg&s=10",
    releaseDate: "1973-12-26",
    genre: "Horror",
    actors: [
      "Ellen Burstyn",
      "Max von Sydow",
      "Linda Blair",
      "Jason Miller",
    ],
  },

  {
    id: 10,
    title: "Se7en",
    image:
      "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    releaseDate: "1995-09-22",
    genre: "Mystery",
    actors: [
      "Brad Pitt",
      "Morgan Freeman",
      "Gwyneth Paltrow",
      "Kevin Spacey",
    ],
  },

  {
    id: 11,
    title: "The Notebook",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYr22790LETzNWpnIg13MNG69yvUqfHI0OJb-iBIVHwRn0yah8BdvbUYtCO0y2L52RSdISLw&s=10",
    releaseDate: "2004-06-25",
    genre: "Romance",
    actors: [
      "Ryan Gosling",
      "Rachel McAdams",
      "James Garner",
      "Gena Rowlands",
    ],
  },

  {
    id: 12,
    title: "The Martian",
    image:
      "https://image.tmdb.org/t/p/w500/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    releaseDate: "2015-10-02",
    genre: "Science Fiction",
    actors: [
      "Matt Damon",
      "Jessica Chastain",
      "Kristen Wiig",
      "Jeff Daniels",
    ],
  },

  {
    id: 13,
    title: "The Game",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJW7AyEZxUqmHbXMye48SjSitjh-uJoXEKI_egOv0zTGxd9wysf81mkZKc_-Q3jnz3Ls6N&s=10",
    releaseDate: "1997-09-12",
    genre: "Thriller",
    actors: [
      "Michael Douglas",
      "Sean Penn",
      "Deborah Kara Unger",
      "James Rebhorn",
    ],
  },

  {
    id: 14,
    title: "Saving Private Ryan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcoCGTGE1e4XiULi_yebQKpH1j5tdjDn-TQlkAmVD4D6e_18NFSBtKW085v1VVfMBpUCrO&s=10",
    releaseDate: "1998-07-24",
    genre: "War",
    actors: [
      "Tom Hanks",
      "Matt Damon",
      "Tom Sizemore",
      "Edward Burns",
    ],
  },

  {
    id: 15,
    title: "The Good, the Bad and the Ugly",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MkB5mnBKa1Mw_y7RH2nWTBWOiU1ppquAQbkWWZBwgiSlOqLjgEgoaua6ubWh3051C6Av&s=10",
    releaseDate: "1966-12-23",
    genre: "Western",
    actors: [
      "Clint Eastwood",
      "Eli Wallach",
      "Lee Van Cleef",
      "Aldo Giuffrè",
    ],
  },
];

export default function MoviesPage() {
  // Movies
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

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

  function handleSubmit(e: React.FormEvent) {
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
      setMovies((currentMovies) =>
        currentMovies.map((movie) =>
          movie.id === editingMovieId
            ? {
                ...movie,
                ...movieData,
              }
            : movie
        )
      );
    } else {
      const newMovie: Movie = {
        id: Date.now(),
        ...movieData,
      };

      setMovies((currentMovies) => [newMovie, ...currentMovies]);
    }

    closeForm();
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
      return;
    }

    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
  }

  const filteredMovies = movies
    .filter((movie) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        movie.title.toLowerCase().includes(searchText) ||
        movie.actors.some((actor) =>
          actor.toLowerCase().includes(searchText)
        );

      const matchesGenre =
        genreFilter === "All" ||
        movie.genre === genreFilter;

      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.releaseDate).getTime() -
          new Date(a.releaseDate).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.releaseDate).getTime() -
          new Date(b.releaseDate).getTime()
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

          <h1 className="text-4xl font-bold tracking-tight">
            Movies
          </h1>

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
            {filteredMovies.length === 1
              ? "movie"
              : "movies"}
          </p>

        </div>

      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (

        <div className="mx-auto mb-8 max-w-7xl rounded-xl border border-slate-800 bg-[#0B1928] p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                {editingMovieId !== null
                  ? "Edit Movie"
                  : "New Movie"}
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

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >

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

                <option value="">
                  Select Genre
                </option>

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
                {editingMovieId !== null
                  ? "Save Changes"
                  : "Add Movie"}
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

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1928] via-transparent to-transparent" />

              </div>

              {/* MOVIE INFORMATION */}
              <div className="p-5">

                <h2 className="truncate text-xl font-bold">
                  {movie.title}
                </h2>

                <div className="mt-3 flex items-center gap-2">

                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${
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

                      <p
                        key={actor}
                        className="text-sm text-slate-300"
                      >
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

          <div className="text-5xl">
            🎬
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            No movies found
          </h2>

          <p className="mt-2 text-slate-500">
            Try changing your search or filter.
          </p>

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