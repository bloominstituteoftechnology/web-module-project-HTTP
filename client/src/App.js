import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// 
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
// Pages
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from './components/AddMovieForm';


import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  
  // When the app first loads, get the list of
  // movies from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => { setMovies(res.data) })
      .catch(err => { console.log(err) });
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

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={[]}/>
        
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

