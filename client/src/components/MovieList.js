import React, { useState, useEffect } from 'react';

import MovieListItem from './MovieListItem';
import MovieFooter from './MovieFooter';
import FavoriteMovieList from './FavoriteMovieList';

import axios from 'axios';

const MovieList = (props)=> {
    
    const [movies, setMovies] = useState([]);

    const { favoriteMovies } = props;

    useEffect(()=>{
      axios.get('http://localhost:5000/api/movies')
        .then(res => {
          setMovies(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);

    return (
        <div className="col">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Genre</th>
                    <th>Metascore</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {
                        movies.map(movie=><MovieListItem key={movie.id} movie={movie}/>)
                    }
                </tbody>
            </table>
            <MovieFooter totalMovies={movies.length}/>
        </div>
    );
}

export default MovieList;