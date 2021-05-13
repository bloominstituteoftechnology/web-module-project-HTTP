import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'


const initialMovie ={
    title:"",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
}


const AddMovieForm =(props) => { 
console.log('add movie form')
const [movie, setMovie] = useState(initialMovie)

const { push} = useHistory()


const handleChange = (e) => {
    setMovie({
        ...movie,
        [e.target.name]: e.target.value
    });
}

 const handleSubmit =(e) => {
     axios.post(`http://localhost:5000/api/movies`)
     .then( res =>{
         e.preventDefault()
         console.log(res.data)
        //  replaces the array with an object
        //  props.setMovies(res.data)
        // this creates a new movie array and adds it to the list, with the data inside
        props.setMovies([...props.movies, res.data])

         push('/movies')
        
     })

 }

 const { title, director, genre, metascore, description } = movie;


 return (
    <div className="modal-body">					
        <div className="form-group">
            <label>Title</label>
            <input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
        </div>
        <div className="form-group">
            <label>Director</label>
            <input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
        </div>
        <div className="form-group">
            <label>Genre</label>
            <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
        </div>
        <div className="form-group">
            <label>Metascore</label>
            <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
        </div>		
        <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            <button onClick= {handleSubmit}>Submit</button>
        </div>

    </div>

 )
}

export default AddMovieForm