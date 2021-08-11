import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom";
import axios from "axios";

import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import MovieHeader from "./components/MovieHeader";
import EditMovieForm from "./components/EditMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";

const BASE_URL = "http://localhost:5000/api/movies";

const App = (props) => {
  const { push } = useHistory();
  const [movies, setMovies] = useState([]);
  //eslint-disable-next-line
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const id = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //eslint-disable-next-line
  const deleteMovie = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then((res) => {
        console.log(res.data);
        push("/movies");
      }) //why is res.data the id of the removed item?
      // how do I update the UI without the updated array of movies?
      .catch((err) => console.error(err));
  };

  //eslint-disable-next-line
  const addToFavorites = (movie) => {};

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">
          <img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD
          Module Project
        </span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm id={id} setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie setMovies={setMovies} deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
