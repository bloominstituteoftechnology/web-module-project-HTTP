const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());

let movies = [
  {
    id: 0,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    genre: 'Drama',
    description: 'The best movie ever its amazing ive never seen it tho.',
    metascore: 100,
  },
  {
    id: 1,
    title: 'Star Wars',
    director: 'George Lucas',
    genre: 'Sci-Fi',
    metascore: 80,
    description: 'Pew pew space laser, bad guys have terrible aim.',
  },
  {
    id: 2,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    genre: 'Fantasy',
    metascore: 80,
    description: 'This ring is really strong idk.',
  },
  {
    id: 3,
    title: 'Terminator 2: Judgement Day',
    director: 'James Cameron',
    metascore: 94,
    genre: 'Sci-Fi',
    description:
      'AI & Robot revenge. Humans working their way towards their own destruction.',
  },
  {
    id: 4,
    title: 'Dumb and Dumber',
    director: 'The Farely Brothers',
    metascore: 76,
    genre: 'Comedy',
    description: 'Two really dumb guys.',
  },
  {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    genre: 'Drama',
    description:
      "A successful lawman's plans to retire anonymously in Tombstone, Arizona are disrupted by the kind of outlaws he was famous for eliminating.",
  },
];

let movieId = movies.length;

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.filter(movie => `${movie.id}` === req.params.id)[0];
  res.status(200).json(movie);
});

app.post("/api/movies", (req, res) => {
  if (req.body.title !== undefined) {
    const newMovie = req.body;
    newMovie["id"] = movieId;
    movies.push(newMovie);
  }
  ++movieId;
  res.status(201).json(movies);
});

app.put("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  if (
    req.body.id === undefined ||
    !req.body.title ||
    !req.body.director ||
    !req.body.metascore ||
    !req.body.description
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  movies = movies.map(movie => {
    if (`${movie.id}` === req.params.id) {
      return req.body;
    }
    return movie;
  });
  res.status(200).send(req.body);
});

app.delete("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  movies = movies.filter(movie => `${movie.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
