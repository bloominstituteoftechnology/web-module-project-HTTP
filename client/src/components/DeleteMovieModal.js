import React from 'react';

const DeleteMovieModal = ({ onCancel: cancel, onDelete: confirmDelete }) => {
    return (<div id="deleteMovieModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <form>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Movie</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={cancel}>&times;</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={cancel}/>
                        <input type="submit" className="btn btn-danger" value="Delete" onClick={(e) => {
                            e.preventDefault();
                            confirmDelete(e);
                        }} />
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;
