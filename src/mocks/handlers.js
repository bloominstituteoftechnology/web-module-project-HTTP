import { rest } from 'msw'
import Data from './data'

function getAll(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(Data.getAll())
  );
}

function getById(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(Data.getById(req.params.id))
  );
}

function create(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(Data.create(req.body))
  );
}

function edit(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(Data.edit(req.params.id, req.body))
  );
}

function remove(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(Data.remove(req.params.id))
  );
}

export const handlers = [
  rest.get('http://localhost:9000/api/movies', getAll),
  rest.get('http://localhost:9000/api/movies/:id', getById),
  rest.post('http://localhost:9000/api/movies', create),
  rest.put('http://localhost:9000/api/movies/:id', edit),
  rest.delete('http://localhost:9000/api/movies/:id', remove)
]
