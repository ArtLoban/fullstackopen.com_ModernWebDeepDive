const { mostBlogs } = require('../utils/list_helper')
const blogs = require('./blogsData')

describe('most blogs', () => {
  const author = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('has author from the collection of items', () => {
    const result = mostBlogs(blogs)
    expect(result).toEqual(author)
  })
})