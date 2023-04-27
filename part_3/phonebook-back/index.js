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


/*** Common resources ***/
// Backend intro
app.get('/', (request, response) => {
  const body = `
    <h1>PhoneBook Backend App!</h1>
    <a href="/info">See Info</a><br>
    <a href="/api/persons">See Persons</a>
  `

  response.send(body)
})

// Just Info
app.get('/info', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.send(getInfo(people.length))
    })
    .catch(error => next(error))
})

/*** Person resources ***/

// GET All People
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

// GET Single Person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

// DELETE Person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// POST new Person
app.post('/api/persons', (request, response, next) => {
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
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('\x1b[31m%s\x1b[0m', `Caught in errorHandler: ${error.message}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)     // this has to be the last loaded middleware.

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const getInfo = (count) => {
  let info = `<p>Phonebook has info for ${count} people</p>`

  const date = new Date()
  info += `<p>${date}</p>`

  return info
}
