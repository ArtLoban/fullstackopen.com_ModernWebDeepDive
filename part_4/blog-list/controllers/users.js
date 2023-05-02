const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all Users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { content: 1, important: 1 })

  response.json(users)
})

// CREATE new User
usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

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

module.exports = usersRouter
