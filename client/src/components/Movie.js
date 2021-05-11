import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => {
    const { addToFavorites, deleteMovie: deleteMovieCallbackFn } = props;
    const [movie, setMovie] = useState('');
    const { id } = useParams();
    const { push } = useHistory();

    // When the page loads, or the id is updated
	// Get the movie's info from the API
	// Set our local state with that data
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => { setMovie(res.data) })
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
                // Redirect user back to the movie list
                push('/movies');
            })
            .catch(err => console.log(err));
    }

    return(<div className="modal-page col">
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
                                <input type="button" onClick={deleteMovie} className="m-2 btn btn-danger" value="Delete"/>
                            </span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Movie;