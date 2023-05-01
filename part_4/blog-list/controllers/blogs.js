const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (e) {
    next(e)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title) {
    return response.status(403).json({
      error: 'Title is required!'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

module.exports = blogsRouter
