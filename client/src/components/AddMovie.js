import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import MovieForm from "./MovieForm";

const AddMovie = ({ update }) => {
	const { push } = useHistory();

	const [movie, setMovie] = useState({
		title: "",
		director: "",
		genre: "",
		metascore: 1,
		description: "",
	});

	const add = (newMovie) => {
		axios
			.post("http://localhost:5000/api/movies", newMovie)
			.then((res) => {
				update(res.data);
				const id = res.data.find((movie) => {
					return movie.title === newMovie.title;
				}).id;
				push(`${id}`);
			})
			.catch((err) => console.log("Error adding movie", err));
	};

	return <MovieForm movie={movie} update={setMovie} submit={add} />;
};

export default AddMovie;
