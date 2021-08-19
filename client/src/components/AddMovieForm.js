import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'

function AddMovieForm(props) {
    const { push } = useHistory();
    const{movies,setMovies} = props
    
    const handleChange = (e) =>{
        setMovies({
            ...movies,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', movies)
        .then(res =>{
            console.log(res)
            setMovies(res.data)
            push('/movies')
        })
    }
    return (
        <div>
            <div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={movies.title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={movies.director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={movies.genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={movies.metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={movies.description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Submit"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>
        </div>
    );
}

export default AddMovieForm
