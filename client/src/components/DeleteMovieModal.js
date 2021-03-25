import React from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';



const DeleteMovieModal = (props) => {

    const history = useHistory();
    const {id} = useParams();
    console.log(id)

    const delMovie = () =>{
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        props.setMovies(res.data);
        window.location.href = '/movies';
    })
    .catch(err => {
        console.log(err)
    })
    }

    const redirectToMovies =() =>{
        history.push(`/movies/${id}`)
    }

    return (<div id="deleteEmployeeModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <form>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Movie</h4>
                        <button type="button" onClick={redirectToMovies}  className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input type="button" onClick={redirectToMovies} className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                        <input type="submit" onClick={delMovie} className="btn btn-danger" value="Delete"/>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;