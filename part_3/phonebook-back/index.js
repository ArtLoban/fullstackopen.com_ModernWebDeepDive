require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')      // HTTP request logger middleware for node.js
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))

app.use(express.json())
app.use(cors())

// Add logger custom `body` token
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const getInfo = () => {
  let info = `<p>Phonebook has info for ${persons.length} people</p>`;

  const date = new Date()
  info += `<p>${date}</p>`

  return info
}

app.get('/', (request, response) => {
  const body = `
    <h1>PhoneBook Backend App!</h1>
    <a href="/info">See Info</a><br>
    <a href="/api/persons">See Persons</a>
  `

  response.send(body)
})

app.get('/info', (request, response) => {
  response.send(getInfo())
})


// GET All People
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

// GET Single Person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// DELETE Person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

// POST new Person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(403).json({
      error: 'Name is required!'
    })
  }
  if (!body.number) {
    return response.status(403).json({
      error: 'Phone number is required!'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// UPDATE Person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
