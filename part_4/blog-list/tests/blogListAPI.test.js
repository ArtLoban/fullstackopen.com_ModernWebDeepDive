const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./testHelper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Newly added Post',
    author: 'Dev',
    url: 'https://google.com',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('Newly added Post')
})

/**
 * Run this single test: $ npm test -- -t "missing likes property defaults to 0"
 */
test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'New Post without likes property',
    author: 'Dev',
    url: 'https://google.com',
  }

  const resultBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.likes).toBeDefined()
  expect(resultBlog.body.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})
