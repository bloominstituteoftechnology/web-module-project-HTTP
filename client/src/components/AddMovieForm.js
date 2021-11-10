import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

const AddMovieForm = (props) => {
    const {push} = useHistory();

    const [movie, setMovie] = useState({
        title: '',
        director: '',
        genre: '',
        metascore: 0,
        description: '',
    });

    const handleChange = (event) => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log(res);
            props.setMovies(res.data);
            push(`/movies`);
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    const {title, director, genre, metascore, description} = movie;

    return (
        <div>
            <div>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <h4>Adding {movie.title}</h4>
                    </div>
                    <div>
                        <div>
                            <label>Title</label>
                            <input value = {title} onChange = {handleChange} name = 'title' type = 'text' />
                        </div>
                        <div>
                            <label>Director</label>
                            <input value = {director} onChange = {handleChange} name = 'director' type = 'text' />
                        </div>
                        <div>
                            <label>Genre</label>
                            <input value = {genre} onChange = {handleChange} name = 'genre' type = 'text' />
                        </div>
                        <div>
                            <label>Metascore</label>
                            <input value = {metascore} onChange = {handleChange} name = 'metascore' type = 'number' />
                        </div>
                        <div>
                            <label>Description</label>
                            <input value = {description} onChange = {handleChange} name = 'description' />
                        </div>
                    </div>
                    <div>
                        <input type = 'submit' value = 'Save' />
                        <Link to = {`/movies`}><input type = 'button' calue = 'Cancel' /></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMovieForm;