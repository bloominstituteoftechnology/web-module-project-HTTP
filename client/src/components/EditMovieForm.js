import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import MovieForm from "./MovieForm";

const EditMovieForm = ({ update }) => {
	const { push } = useHistory();
	const { id } = useParams();

	const [movie, setMovie] = useState({
		title: "",
		director: "",
		genre: "",
		metascore: 1,
		description: "",
	});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				setMovie(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (newMovie) => {
		axios
			.put(`http://localhost:5000/api/movies/${id}`, { ...newMovie, id })
			.then((res) => {
				update(res.data);
				push(`/movies/${id}`);
			})
			.catch((err) => console.log("Error", err));
	};

	return <MovieForm submit={handleSubmit} movie={movie} update={setMovie} />;
};

export default EditMovieForm;
