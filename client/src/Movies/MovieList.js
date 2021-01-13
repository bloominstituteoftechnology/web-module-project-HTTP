import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default function MovieList(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     movies: []
  //   };
  // }

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:5000/api/movies")
  //     .then(res => this.setState({ movies: res.data }))
  //     .catch(err => console.log(err.response));
  // }

  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}


function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
