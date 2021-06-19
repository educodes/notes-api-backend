const express = require('express')
const cors = require('cors')
const logger = require('./LoggerMiddleware')
const app = express()
const PORT = 3001
app.listen(PORT)

app.use(express.json())
app.use(cors())

app.use(logger)

let notes = [
  {
    id: 1,
    title: 'HTML',
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: false
  },
  {
    id: 2,
    title: 'HTML',
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    title: 'HTML',
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: false
  },
  {
    id: 4,
    title: 'HTML',
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: false
  }
]

// --------- Obtener Datos

app.get('/', (request, response) => {
  response.send('<h1>Hello Alice ..</h1>')
})

app.get('/notes', (request, response) => {
  response.json(notes)
})

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((nt) => {
    return nt.id === id
  })
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  console.log(note)
})

// ----------- Eliminar datos

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((nt) => nt.id !== id)
  res.status(204).end()
})

// ----------- Eliminar datos

app.post('/notes/', (request, response) => {
  const getNote = request.body

  if (!getNote || !getNote.content || !getNote.title) {
    return response.status(400).json({
      error: 'getNote.content is missing'
    })
  }

  const idNote = notes.map((notess) => notess.id)
  const idMax = Math.max(...idNote)

  const newNote = {
    id: idMax + 1,
    title: getNote.title,
    content: getNote.content,
    important:
      typeof getNote.important !== 'undefined' ? getNote.important : false,
    date: new Date().toISOString()
  }
  // notes = [...notes, newNote]
  notes = notes.concat(newNote)
  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found Page : 404'
  })
})
