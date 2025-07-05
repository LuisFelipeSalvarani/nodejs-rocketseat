import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (!req.body || !req.body.title || !req.body.description) {
        return res
          .setHeader('Content-type', 'application/json')
          .writeHead(400)
          .end(JSON.stringify({ message: 'Title and description must be present.' }))
      }

      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if (!req.body || (!req.body.title && !req.body.description)) {
        return res
          .setHeader('Content-type', 'application/json')
          .writeHead(400)
          .end(JSON.stringify({ message: 'Title or description must be present.' }))
      }

      const { title, description } = req.body

      const result = database.update('tasks', id, {
        title,
        description,
      })

      if (result) {
        return res.writeHead(204).end()
      }

      return res.writeHead(404).end(JSON.stringify({ message: 'Task not found.' }))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const result = database.delete('tasks', id)

      if (result) {
        return res.writeHead(204).end()
      }

      return res
        .setHeader('Content-type', 'application/json')
        .writeHead(404)
        .end(JSON.stringify({ message: 'Task not found.' }))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const result = database.complete('tasks', id)

      if (result) {
        return res.writeHead(204).end()
      }

      return res
        .setHeader('Content-type', 'application/json')
        .writeHead(404)
        .end(JSON.stringify({ message: 'Task not found.' }))
    }
  },
]