import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const emptyEditForm = {
	title:"Loading movie...",
	director: "",
	genre: "",
	metascore: 0,
	description: ""
};

const EditMovieForm = ({ updateMovie: updateMovieCallbackFn }) => {
	const { push } = useHistory();

	// id passed in as a parameter from the page's URL
	const { id } = useParams();

	// Local state of the movie we would like to edit
	const [movie, setMovie] = useState(emptyEditForm);

	// When the page loads, or the id is updated
	// Get the movie's info from the API
	// Set our local state with that data
	useEffect(() => {
		axios.get(`http://localhost:5000/api/movies/${id}`)
			.then(res => { setMovie(res.data || emptyEditForm) })
			.catch(err => { console.log(err) })
	}, [id])
	
	// Update our local form state for any input field change
	const updateLocalFormState = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

	// Update Movie's state on server and locally
	// Using this form's "move" local state values
    const updateMovie = (e) => {
		e.preventDefault();
		
		// PUT: Updates movie with `id`
		// Note: res.data is an array of all movies on the server
		axios.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then(res => {
				// Update app level state for our movie
				updateMovieCallbackFn(id, movie);
				// Redirect to the "view/detail" page for the movie we just updated
				push(`/movies/${id}`)
			})
			.catch(err => console.log(err));
	};
	
	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={updateMovie}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{title}</strong></h4>
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
						<input value={metascore} onChange={updateLocalFormState} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={updateLocalFormState} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Update"/>
					<Link to={`/movies/${id}`}>
						<input type="button" className="btn btn-default" value="Cancel"/>
					</Link>
				</div>
			</form>
		</div>
	</div>);
}

export default EditMovieForm;