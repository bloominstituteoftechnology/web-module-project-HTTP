import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateMovie(props) {
    const [updatedMovie, setUpdatedMovie] = useState({
        title: "",
        director: "",
        metascore: null,
        stars: []
    })

    const { match, movies } = props;
    console.log("props", props)
    useEffect(() => {
        const id = match.params.id;
        const itemById = movies.find(item => `${item.id}` === id)

        if (itemById) {
            setUpdatedMovie(itemById)
        }
    }, [match.params.id, movies])

    const changeHandler = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
            .then(res => {
                console.log(res)
                props.getData()
                props.history.push(`/movies/${props.match.params.id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={updatedMovie.title}
                placeholder="title"
                onChange={changeHandler}
            />
            <label>Director</label>
            <input
                type="text"
                name="director"
                value={updatedMovie.director}
                placeholder="director"
                onChange={changeHandler}
            />
            <label>Metascore</label>
            <input
                type="text"
                name="metascore"
                value={updatedMovie.metascore}
                placeholder="metascore"
                onChange={changeHandler}
            />
            <button>Update</button>
        </form>
    )
}

export default UpdateMovie;