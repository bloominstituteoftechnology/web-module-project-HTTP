import React, { useEffect, useState, useHistory, useParams } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";

import EditMovieForm from "./components/EditMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import DeleteMovieModal from "./components/DeleteMovieModal";
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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
          <FavoriteMovieList
            favoriteMovies={favoriteMovies}
            setFavoriteMovies={setFavoriteMovies}
          />

          <Switch>
            <Route
              path="/movies/edit/:id"
              render={(props) => (
                <EditMovieForm
                  {...props}
                  movies={movies}
                  setMovies={setMovies}
                />
              )}
            ></Route>

            <Route exact path="/movies/:id">
              <Movie
                setMovies={setMovies}
                movies={movies}
                favoriteMovies={favoriteMovies}
                setFavoriteMovies={setFavoriteMovies}
              />
            </Route>

            <Route exact path="/movies">
              <MovieList movies={movies} />
            </Route>
            <Route exact path="/addmovie">
              <AddMovieForm setMovies={setMovies} movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>

            {/* <Route path="/movies/deletemovie/:id">
              <Movie setMovies={setMovies} />
            </Route> */}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
