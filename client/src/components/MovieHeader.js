import React from 'react';
import { Link, useHistory} from 'react-router-dom';

const MovieHeader = ()=> {
    const {push} =useHistory();
const handleAdd =(e)=>{
    e.preventDefault();
    return push("/addMovie",)

}
    return(<div className="table-title">
        <div className="row">
        <div className="col-sm-6">
            <h2>IMDB Movie Database</h2>
        </div>
        <div className="col-sm-6">
            <Link className="btn btn-success"><i className="material-icons">&#xE147;</i> <span onClick={handleAdd}>Add New Movie</span></Link>
            <Link to="/movies" className="btn btn-primary">View All Movies</Link>
        </div>
        </div>
    </div>);
}

export default MovieHeader;