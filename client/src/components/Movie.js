import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

const Movie = (props) => {
    const { addToFavoritesm, deleteMovie} = props;//9b you must add "deleteMovie here in props to "see" the res data produced from 9A below in the handle click. note at this point deleteMovie in App.js is NOT complete nore is handleClick YET below. That occurs in other steps. This is also Step 11. 

    const [movie, setMovie] = useState('');

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [id]);

    //9A Build an event handler that makes a request to delete the currently viewed movie. Observe what is returned from the request.Note This requires brining in "deleteMove as props see above. "
    const handleClick = () => {
        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log('Movie.js HandleClick res:', res);

            })
            .catch(err => {
                console.log('err', err)
            })
    }

    return (<div className="modal-page col">
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
                            <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                            {/* 8 Identify the component that holds the "button" needed for deletion. Add an event handler to that button.(Note to self... I used Dev Tools under Components to narrow in on the correct component.i.e. Movie.js) */}
                            <span className="delete">
                                <input type="button" className="m-2 btn btn-danger" value="Delete" onClick={handleClick} />
                            </span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Movie;