import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteMovieModal = (props) => {
    const { id } = useParams();
    const { push } = useHistory();

    const handleDeleteClick = (e) => {
        e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {  
        props.deleteMovie(id);
        push('/api/movies');
    })
    .catch(err=> {
      console.log(err);
    })
    }
    return (<div id="deleteEmployeeModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <form onSubmit={handleDeleteClick}>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Movie</h4>
                        <Link to={`/movies/${id}`}>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </Link>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these movies?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <Link to={`/movies/${id}`}>
                            <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                        </Link>
                        
                        <input type="submit" className="btn btn-danger" value="Delete" />
                        <Link to={`/movies/`}> </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;