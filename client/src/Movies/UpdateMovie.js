import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import MovieCard from "./MovieCard";

const initialForm = {
	title: "",
	director: "",
	metascore: 0,
	stars: [],
	newStar: "",
};

const UpdateMovie = () => {
	const [form, setForm] = useState(initialForm);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setForm({ ...res.data, newStar: "" }))
			.catch((err) => console.log(err.response));
	}, []);

	const onSubmit = (e) => {
		axios.put(`http://localhost:5000/api/movies/${id}`, form);
	};

	const addStar = (e) => {
		e.preventDefault();
		setForm({
			...form,
			stars: [...form.stars, form.newStar],
			newStar: "",
		});
	};

	const removeStar = (toDelete) => {
		setForm({
			...form,
			stars: form.stars.filter((star, index) => {
				return index !== toDelete;
			}),
		});
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	return (
		<form className="movie-card" onSubmit={onSubmit}>
			<h4>Edit Movie</h4>
			<label>
				Title:
				<input
					type="text"
					name="title"
					value={form.title}
					onChange={onChange}
				/>
			</label>
			<label>
				Director:
				<input
					type="text"
					name="director"
					value={form.director}
					onChange={onChange}
				/>
			</label>
			<label>
				MetaScore:
				<input
					type="number"
					step={1}
					name="metascore"
					value={form.metascore}
					onChange={onChange}
				/>
			</label>
			<label>Stars:</label>
			{form.stars &&
				form.stars.map((star, index) => (
					<label key={index}>
						<strong>{star}</strong>
						<strong onClick={(e) => removeStar(index)}>x</strong>
					</label>
				))}
			<label>
				<input
					type="text"
					name="newStar"
					value={form.newStar}
					onChange={onChange}
				/>
				<button onClick={addStar}>+</button>
			</label>
			<button>Submit Changes</button>
		</form>
	);
};

export default UpdateMovie;
