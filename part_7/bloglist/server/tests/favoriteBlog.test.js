const { favoriteBlog } = require('../utils/list_helper')
const blogs = require('./blogsData')

describe('favorite blog', () => {
  const favorite = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  test('is equal to one from the collection of blog items', () => {
    const result = favoriteBlog(blogs)
    expect(result).toEqual(favorite)
  })
})


