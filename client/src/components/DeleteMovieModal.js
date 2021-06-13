import React from 'react';

const DeleteMovieModal = (props) => {
    const { setModal, deleteMovie, push, id } = props;

    const handleCancel = () => {
        setModal(false);
    };

    const handleDelete = (id) => {
        deleteMovie(id);
        push('/movies');
        setModal(false);
    };


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

        <input 
        value="Cancel"
        type="button" 
        className="btn btn-default" 
        data-dismiss="modal" 
        onClick={handleCancel}/>

        <input 
        value="Delete"
        type="submit"
        className="btn btn-danger"
        onClick={handleDelete} />
</div>
</form>
</div>
</div>
</div>)
}
export default DeleteMovieModal