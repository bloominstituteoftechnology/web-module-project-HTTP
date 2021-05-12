import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const initialMovie ={
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
}

const EditMovieForm = (props) => {
	const { push } = useHistory();

	const [movie, setMovie] = useState(initialMovie);
	const{ id } = useParams()
	
	useEffect(()=> {
		axios.get(`http://localhost:5000/api/movies/${id}`)
		.then(res => {
			console.log(res.data)
			setMovie(res.data);
		})
		.catch(err => console.log(err))
	}, [id])

	const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }
console.log(props)
    const handleSubmit = (e) => {
		e.preventDefault();
		console.log('updating movie', movie)
		axios.put(`http://localhost:5000/api/movies/${id}`, movie)
		.then(res => {
		  console.log(res.data);
		  props.setMovies(res.data);
		  push(`/`);
		})
		.catch(err => console.log(err));
	}
	
	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>);
}

export default EditMovieForm;