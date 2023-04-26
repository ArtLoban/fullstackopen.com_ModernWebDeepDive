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


// Fetch all
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    console.log(people);

    response.json(people)
  })
})

// Fetch single
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Create new
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

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
