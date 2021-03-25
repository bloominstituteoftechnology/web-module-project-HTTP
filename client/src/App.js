import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect} from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from './components/AddMovieForm';
import DeleteMovieModal from "./components/DeleteMovieModal";


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



  const addToFavorites = (movie) => {
    const check = favoriteMovies.some(mov=> mov.title ===movie.title);
    return check ? favoriteMovies : setFavoriteMovies([...favoriteMovies, movie])
  }


  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />
        
          <Switch> 

            <Route path='/movies/:id/modal'>
            <DeleteMovieModal setMovies={setMovies}/>
            </Route>

            <Route path='/addmovie'>
            <AddMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie setMovies={setMovies} addToFavorites={addToFavorites}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
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

