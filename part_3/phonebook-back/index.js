const express = require('express')
const app = express()

app.use(express.json())

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
    <h1>Persons Backend App!</h1>
    <a href="/info">See Info</a><br>
    <a href="/api/persons">See Persons</a>
  `

  response.send(body)
})

app.get('/info', (request, response) => {
  response.send(getInfo())
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

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


const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body      // Without the json-parser, the body property would be undefined.

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is required!'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'Phone number is required!'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

