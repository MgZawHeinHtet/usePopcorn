import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./components/StarRating.jsx";
import App from "./App.jsx"

function Test() {
  const [movieRate,setMovieRate] = useState(0);
  return (
    <>
      <StarRating maxRating={5} color="red" onSetRating={setMovieRate}/>
      <h3>The movie was {movieRate} rates</h3>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
    {/* <StarRating
      color="green"
      maxRating={5}
      messages={["teffrilbe", "bad", "not bad", "good", "exellent"]}
    />
    <StarRating maxRating={15} defaultRating={3} />
     <Test/> */}
  </React.StrictMode>
);
