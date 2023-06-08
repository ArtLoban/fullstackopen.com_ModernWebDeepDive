const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all Users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

  response.json(users)
})

// CREATE new User
usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!username) {
    return response.status(400).json({
      error: 'username is required!'
    })
  }
  if (!password) {
    return response.status(400).json({
      error: 'password is required!'
    })
  }
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password value is shorter than the minimum allowed length (3)'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (e) {
    next(e)
  }
})

// GET User
usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(user)
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter
