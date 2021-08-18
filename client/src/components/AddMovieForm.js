import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialValues = {
  title: "",
  director: "",
  genre: "",
  metascore: 0,
  description: "",
};

const AddMovieForm = (props) => {
  const { push } = useHistory();
  const [newMovie, setNewMovie] = useState(initialValues);

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => props.setMovies(res.data))
      .catch((err) => console.log(err));

    push("/movies");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={newMovie.title}
        onChange={handleChange}
      />

      <label>Director:</label>
      <input
        type="text"
        name="director"
        value={newMovie.director}
        onChange={handleChange}
      />

      <label>Genre:</label>
      <input
        type="text"
        name="genre"
        value={newMovie.genre}
        onChange={handleChange}
      />

      <label>Metascore:</label>
      <input
        type="integer"
        name="metascore"
        value={newMovie.metascore}
        onChange={handleChange}
      />

      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <button>Submit</button>
    </form>
  );
};

export default AddMovieForm;
