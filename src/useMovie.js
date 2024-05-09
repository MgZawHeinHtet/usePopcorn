import { useEffect, useState } from "react";

const API_KEY = "98b5bcd";
const controller = new AbortController();

export default function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      };
    },
    [query]
  );

  return [movies,loading,error]
}
