const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/сomment')

// GET Blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
    response.json(blogs)
  } catch (e) {
    next(e)
  }
})

// CREATE Blog
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const requestUser = request.user

  if (!requestUser?.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title) {
    return response.status(400).json({
      error: 'Title is required!'
    })
  }
  if (!body.author) {
    return response.status(400).json({
      error: 'Author is required!'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'URL is required!'
    })
  }

  const user = await User.findById(requestUser.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populated = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populated)
  } catch (e) {
    next(e)
  }
})

// DELETE Blog
blogsRouter.delete('/:id', async (request, response, next) => {
  const requestUser = request.user

  if (!requestUser?.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== requestUser.id.toString()) {
    return response.status(400).json({
      error: 'Unauthorised to perform this action!'
    })
  }

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

// UPDATE Blog record
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes || 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    const populated = await updatedBlog.populate('user', { username: 1, name: 1 })

    response.json(populated)
  } catch (e) {
    next(e)
  }
})

// CREATE Comment related to Blog
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'Content field is required!'
    })
  }

  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: body.content,
    createdAt: new Date(),
  })

  try {
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    const populated = await savedComment.populate('blog', { title: 1, author: 1 })
    response.status(201).json(populated)
  } catch (e) {
    next(e)
  }
})

module.exports = blogsRouter
