import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialValue = {
	title: "",
	director: "",
	genre: "",
	metascore: 0,
	description: ""
};

const AddMovie = (props) => {
	const { push } = useHistory()
	const [newMovie, setNewMovie] = useState(initialValue)
		;

	const handleChange = (e) => {
		setNewMovie({
			...newMovie,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		axios
			.post('http://localhost:5000/api/movies/', newMovie)
			.then((res) => {
				props.setNewMovie(res.data)
			})
			.catch((err) => { console.log(err) })
		push('/movies/')
	}
	


	return (
		<div className="col">
			<div className="modal-content">
				<form onSubmit={handleSubmit}>
					<div className="modal-header">
						<h4 className="modal-title">Editing <strong>{newMovie.title}</strong></h4>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Title</label>
							<input value={newMovie.title} onChange={handleChange} name="title" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Director</label>
							<input value={newMovie.director} onChange={handleChange} name="director" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Genre</label>
							<input value={newMovie.genre} onChange={handleChange} name="genre" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Metascore</label>
							<input value={newMovie.metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
						</div>
						<div className="form-group">
							<label>Description</label>
							<textarea value={newMovie.description} onChange={handleChange} name="description" className="form-control"></textarea>
						</div>
									
					</div>
					<div className="modal-footer">
						<input type="submit" className="btn btn-info" value="Save" />
						
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddMovie 