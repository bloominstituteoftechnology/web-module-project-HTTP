import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DeleteMovieModal from './DeleteMovieModal'
import axios from 'axios';

const emptyMovieState = {
	title:"Loading movie...",
	director: "",
	genre: "",
	metascore: 0,
	description: ""
};

const Movie = (props) => {
    const { deleteMovie: deleteMovieCallbackFn } = props;
    const [movie, setMovie] = useState(emptyMovieState);
    const [isDeleting, setIsDeleting] = useState(false);
    const { id } = useParams();
    const { push } = useHistory();

    // When the page loads, or the id is updated
	// Get the movie's info from the API
	// Set our local state with that data
    // NOTE:
    // Instead of doing an axios call to get this movie's state
    // it should already be in app state. We could just pass it
    // as a prop
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => { setMovie(res.data || emptyMovieState) })
            .catch(err => { console.log(err.response) })
    }, [id]);

    // Delete movie on server
    // Update app state to remove movie
    // Redirect user back to movie list
    function deleteMovie () {
        // Note: res.data is the id of the movie that was
        // successfully deleted
        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // Delete the movie from app level state
                deleteMovieCallbackFn(id);
                // Hide delete modal
                setIsDeleting(false);
                // Redirect user back to the movie list
                push('/movies');
            })
            .catch(err => console.log(err));
    }

    function showDeleteModal () {
        setIsDeleting(true);
    }

    return(
    <>
        {/* Show DeleteMovieModal if we're deleting */}
        {isDeleting && (
            <div style={{ 
                position: 'fixed',
                zIndex: '99',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <DeleteMovieModal onCancel={() => setIsDeleting(false)} onDelete={deleteMovie} />
            </div>
        )}
        {/* Our Movie to display */}
        <div className="modal-page col">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">						
                        <h4 className="modal-title">{movie.title} Details</h4>
                    </div>
                    <div className="modal-body">
                        <div className="flexContainer">

                            <section className="movie-details">
                                <div>
                                    <label>Title: <strong>{movie.title}</strong></label>
                                </div>
                                <div>
                                    <label>Director: <strong>{movie.director}</strong></label>
                                </div>
                                <div>
                                    <label>Genre: <strong>{movie.genre}</strong></label>
                                </div>
                                <div>
                                    <label>Metascore: <strong>{movie.metascore}</strong></label>
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <p><strong>{movie.description}</strong></p>
                                </div>
                            </section>
                            
                            <section>
                                <span className="m-2 btn btn-dark">Favorite</span>
                                <Link to={`/movies/edit/${id}`} className="m-2 btn btn-success">Edit</Link>
                                <span className="delete">
                                    <input type="button" onClick={showDeleteModal} className="m-2 btn btn-danger" value="Delete"/>
                                </span>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Movie;