import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

  

const DeleteMovieModal = (props) => {
    console.log(props)
    const {id}=useParams()

    console.log(id)

    const handleDeleteClick = ()=> {
        axios.delete(`http://localhost:5000/api/movies/${id}`)
          .then(res=> {
            props.setItems(res.data);
            props.history('/movies');
          })
          .catch(err=>{
            console.log(err);
          })
          props.history('/movies');
          props.deleteMovie(Number(id))
        }

        const handleCancel=() => {
return  props.history.push('/movies');
        }
    
    return (<div id="deleteMovieModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <form>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Movie</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input type="button" onClick={handleCancel} className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                        <input type="submit" onClick={handleDeleteClick} className="btn btn-danger" value="Delete"/>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;
