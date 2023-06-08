const commentsRouter = require('express').Router()
const Comment = require('../models/сomment')
const Blog = require('../models/blog')

// GET Comments
commentsRouter.get('/', async (request, response, next) => {
  try {
    const comments = await Comment.find({}).populate('blog', { title: 1, author: 1 })
    response.json(comments)
  } catch (e) {
    next(e)
  }
})

// CREATE Comment
commentsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'Content field is required!'
    })
  }
  if (!body.blogId) {
    return response.status(400).json({
      error: 'Blog field is required!'
    })
  }

  const blog = await Blog.findById(body.blogId)

  const comment = new Comment({
    content: body.content,
    createdAt: new Date(),
    blog: blog.id
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

// DELETE Comment
commentsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Comment.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = commentsRouter
