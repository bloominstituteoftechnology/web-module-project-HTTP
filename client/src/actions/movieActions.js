import axios from 'axios';

export const LOAD_MOVIE = "LOAD_MOVIE";

const loadMovie = ((id) => {
    return ((dispatch) => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then((resp) => {
                console.log(resp.data());
            }).catch((err) => console.log(err));
    })
})

export {
    loadMovie
}