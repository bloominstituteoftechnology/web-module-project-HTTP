import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import DeleteMovieModal from './components/DeleteMovieModal';
import AddMovieForm from './components/AddMovieForm';
import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => (movie.id !== Number(id))))
  }

  const addToFavorites = (id) => {
    console.log(id)
    const newFavorite = movies.find((movie) => {
      if (movie.id == id) {
        return movie
      }
    })
    console.log(newFavorite)
    setFavoriteMovies(favoriteMovies, newFavorite)
    // console.log(favoriteMovies.forEach(movie => movie.title))
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id" >
              <EditMovieForm setMovie={setMovies} />
            </Route>

            <Route path='/movies/delete/:id'>
              <DeleteMovieModal {...props} deleteMovie={deleteMovie} />
            </Route>

            <Route path='/movies/add'>
              <AddMovieForm setMovie={setMovies}/>
              </Route>

            <Route path="/movies/:id">
              <Movie {...props} addToFavorites={addToFavorites}/>
            </Route>

            <Route path="/movies">
              <MovieList {...props} movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

