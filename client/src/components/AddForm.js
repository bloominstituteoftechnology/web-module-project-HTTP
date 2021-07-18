import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddForm = props => {

    const [movieFormValues, setMovieFormValues] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(movieFormValues)
		// axios.post("endpoin something url", movie)
		axios.post("localhost:5000/api/movies", movieFormValues)
		// already formatted perfectly to be the request body because we matched they keys and variable naming in intialItem Above
		.then(res => {
			console.log("Item added!", res);
			// Update items array with res.data
			props.setItems(res.data);
			props.history.push("/movie-list");
		})
		.catch(err => console.log("error editing item", err))

	}
	

    return (
        <div className="col">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">						
                        <h4 className="modal-title">Editing <strong>{movieFormValues.title}</strong></h4>
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

export default AddForm;