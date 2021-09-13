import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const initialValues = {
    title: "",
    director: "",
    genre: "", 
    metascore: 0,
    description: "",
};

const AddMovieForm = (props) => {
    const {push} = useHistory();
    const [newMovie, setNewMovie] = useState(initialValues);

    const handleChange = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/movies", newMovie)
        .then((res) => props.setMovies(res.data))
        .catch((err) => console.log(err));
        
        push("/movies");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
            name="title"
            value={newMovie.title}
            onChange={handleChange}
            type="text"
            />
            
            <label>Director:</label>
            <input
            name="director"
            value={newMovie.director}
            onChange={handleChange}
            type="text"
            />

            <label>Genre:</label>
            <input
            name="genre"
            value={newMovie.genre}
            onChange={handleChange}
            type="text"
            />

            <label>Metascore:</label>
            <input
            name="metascore"
            value={newMovie.metascore}
            onChange={handleChange}
            type="integer"
            />

            <label>Description:</label>
            <input
            name="description"
            value={newMovie.description}
            onChange={handleChange}
            type="text"
            />

            <button>Submit</button>
        </form>
    );
};