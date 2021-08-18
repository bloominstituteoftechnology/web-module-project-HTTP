import React from 'react';
import { Link } from 'react-router-dom';

const MovieHeader = ()=> {
    return(<div className="table-title">
        <div className="row">
        <div className="col-sm-6">
            <h2>Rick's Cool Ass Movie Database</h2>
        </div>
        <div className="col-sm-6">
            {/* 15 Locate the part of the ui that should redirect to your new `AddMovieForm`. Make that button works as expected. (Note to self...The button originates in MovieHeader.js. I found this by righ clicking on the "Add New Movie Button and selecting inspect in chrome dev tools under "componenets" it shows the location. Since we already just Routed it in App.js, now we just add "to="/movies/add"" to the button in MovieHeader.js's appropriate "<Link>") */}
            <Link to="/movies/add" className="btn btn-success"><i className="material-icons">&#xE147;</i> <span>Add New Movie</span></Link>
            <Link to="/movies" className="btn btn-primary">View All Movies</Link>
        </div>
        </div>
    </div>);
}

export default MovieHeader;