import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import AddMovieForm from "./components/addMovieForm"

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("res.data", res);

        const newMoviesList = movies.filter(eachMovie => eachMovie.id !== res.data);
        setMovies(newMoviesList);
        history.push('/movies/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  const addToFavorites = (movie) => {

  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route
              path="/movies/edit/:id"
              render={props => <EditMovieForm {...props} movies={movies} setMovies={setMovies} />}
            />

            <Route
              path="/movies/add/"
              render={props => <AddMovieForm {...props} movies={movies} setMovies={setMovies} />}
            />

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies"
              render={props => <MovieList {...props} movies={movies} setMovies={setMovies} />}
            />

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

