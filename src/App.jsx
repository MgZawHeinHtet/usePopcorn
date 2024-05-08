import { useEffect, useState } from "react";
import "./index.css";
import StarRating from "./components/StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, onQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

// function WatchBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedMovieResult watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function WatchedMovieResult({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(0)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onRemoveMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onRemoveMovie={onRemoveMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onRemoveMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => onRemoveMovie(movie.imdbID)}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, onSelectId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectId={onSelectId} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectId }) {
  return (
    <li onClick={() => onSelectId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}

function MovieDetail({
  selectedMovieID,
  onCloseDetail,
  onAddWatchedMovie,
  watchedMovieList,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState("");
  const [oldMovie, setOldMovie] = useState(null);

  const {
    Actors: actors,
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    imdbRating,
    Year: year,
    Director: director,
    Gerne: gerne,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovieID,
      title,
      year,
      poster,
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseDetail();
  }

  function findFromList(id) {
    const movie = watchedMovieList.find((movie) => movie.imdbID === id);
    setOldMovie(movie);
  }
  useEffect(
    function () {
      findFromList(selectedMovieID);
      async function fetchMovie() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovieID}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      fetchMovie();
    },
    [selectedMovieID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie : ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button onClick={onCloseDetail} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt="" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{gerne}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {oldMovie ? (
                <StarRating
                  defaultRating={oldMovie.userRating}
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />{" "}
                  {userRating > 0 && (
                    <button onClick={handleAdd} className="btn-add">
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>staring {actors}</p>
            <p>directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

const API_KEY = "98b5bcd";
const MOVIE_NAME = "catch me";

export default function App() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const controller = new AbortController();

  function handleSelectedId(id) {
    setSelectedMovieId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseDetail() {
    setSelectedMovieId(null);
  }

  function handleAddWatchList(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatchedMovie(selectedId) {
    const movies = watched.filter((movie) => movie.imdbID != selectedId);
    setWatched(movies);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("You have some error with fetching Data");

          const data = await res.json();
          if (data.Response === "False") {
            setMovies([]);
            throw new Error("movie not found");
          }
          setMovies(data.Search);
        } catch (error) {
          if (error.name != "AbortError") setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        setLoading(false);
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
        handleCloseDetail();
      };
    },
    [query]
  );
  return (
    <>
      <Navbar>
        <Search query={query} onQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {loading && <Loading />}
          {!error && !loading && (
            <MovieList
              movies={movies}
              onSelectId={handleSelectedId}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetail
              watchedMovieList={watched}
              selectedMovieID={selectedMovieId}
              onCloseDetail={handleCloseDetail}
              onAddWatchedMovie={handleAddWatchList}
            />
          ) : (
            <>
              <WatchedMovieResult watched={watched}></WatchedMovieResult>
              <WatchedMovieList
                onRemoveMovie={handleRemoveWatchedMovie}
                watched={watched}
              ></WatchedMovieList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
