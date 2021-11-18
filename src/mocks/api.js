const express = require('express');
const Data = require('./data');
const cors = require('cors');

const api = express();

api.use(express.json());

api.use(cors());

api.get('/api/movies', (req, res) => {
  res.json(Data.getAll())
})

//Get Post Endpoint
api.get('/api/movies/:id',(req, res) => {
  res.json(Data.getById(req.params.id))
})

//Create Post Endpoint
api.post('/api/movies', (req, res) => {
  res.json(Data.create(req.body))
})

//Edit Post Endpoint
api.put('/api/movies/:id', (req, res) => {
  res.json(Data.edit(req.params.id, req.body))
})

//Delete Post Endpoint
api.delete('/api/movies/:id', (req, res) => {
  res.json(Data.remove(req.params.id))
})

api.listen(9000, () => {
  console.log('listening on 9000')
})
