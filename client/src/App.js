import React, { useEffect, useState} from "react";

import { Route, Switch, Redirect, useHistory} from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from "./components/AddMovieForm";
import axios from 'axios';
import DeleteMovieModal from "./components/DeleteMovieModal";

const App = (props) => {
  
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory();

  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log('this is error', err);
      });
  }, []);

  const deleteMovie = (num)=> {
    axios.delete(`http://localhost:5000/api/movies/${num}`)
      .then(res => {
        setMovies(
          movies.filter(movie=>{
            return movie.id !== res.data
          })
        )
        const newFav= favoriteMovies.filter(mov=>{
          return res.data !== mov.id
        })
        setFavoriteMovies(newFav)
        })
      .catch(err => {
        console.log('this is error', err);
      });
  }

  const addToFavorites = (movie) => {
    const newFav= favoriteMovies.filter(mov=>{
      return movie.id !== mov.id
    })
    setFavoriteMovies([
      movie,
      ...newFav
    ])
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
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/delete">
              <DeleteMovieModal />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites}/>
            </Route>

            <Route path="/addmovie">
              <AddMovieForm setMovies={setMovies}/>
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
};


export default App;

