const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET Blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (e) {
    next(e)
  }
})

// CREATE Blog
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'Title is required!'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'URL is required!'
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

// DELETE Blog
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
