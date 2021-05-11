import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm';
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

  // PUT: Update movie
  function updateMovie(id, movie) {
    setMovies([
      // All unmodified movies
      ...movies.filter(movie => movie.id !== id),
      // Our updated movie
      Object.assign({}, { id }, movie)
    ])
  }

  // DELETE: Delete movie
  function deleteMovie(id) {
    const newMovieList = movies.filter((movie) => movie.id !== id );
    setMovies(newMovieList)
  } 
  
  // Created this deleteMovie function, that filters out a movie by it's id, then
  // refreshses the movieList. This function is added to the component where the
  // delete axios call is being made. The deleteMovie function is being passed down via
  // via props to Movie. Where it can then access it to put into the axios call. So that
  // this function fires whenever the delete button is pushed.
  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm updateMovie={updateMovie} />
            </Route>
            
            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>

          </Switch>
        </div>
      </div>
    </div>
  );
}


export default App;

