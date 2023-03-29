import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Movie = (props) => {
  const { addToFavorites} = props;

  const [movie, setMovie] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        console.log(res, '2')
        setMovie(res.data);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [id]);
  
  const handleDeleteClick = () => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(res=>{
        props.deleteMovie(id)
        console.log(movie)
        navigate('/movies')
      })
      .catch(err => {
        console.error(err.response)
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
              <span className="delete"><input onClick={handleDeleteClick} type="button" className="m-2 btn btn-danger" value="Delete" /></span>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default Movie;
