const { mostLikes } = require('../utils/list_helper')
const blogs = require('./blogsData')

describe('most likes', () => {
  const author = {
    author: 'Edsger W. Dijkstra',
    likes: 1
  }

  test('has author from the collection of items', () => {
    const result = mostLikes(blogs)
    expect(result).toEqual(author)
  })
})