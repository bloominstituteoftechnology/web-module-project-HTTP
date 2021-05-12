import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddMovieForm ({ setMovies }) {
	const { push } = useHistory();
	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

	// Create the movie on the server by POST'ing our form data
	// Use the API call's return value to update local app state
    function addMovie(e) {
		e.preventDefault();

		// Note: res.data is an array of all movies
        axios.post(`http://localhost:5000/api/movies`, movie)
            .then(res => {                   
				// Update our app's state using the API Call's response
                setMovies(res.data);
				// Redirect to movies list page
				push('/movies')
            })
            .catch(err => console.log(err))
    }

	// Update our local form state for any input field change
	const updateLocalFormState = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={addMovie}>
				<div className="modal-header">						
					<h4 className="modal-title">Adding <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={updateLocalFormState} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={updateLocalFormState} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={updateLocalFormState} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input text={metascore} onChange={updateLocalFormState} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={updateLocalFormState} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Create"/>
					<Link to="/movies">
						<input type="button" className="btn btn-default" value="Cancel"/>
					</Link>
				</div>
			</form>
		</div>
	</div>);
}

export default AddMovieForm;