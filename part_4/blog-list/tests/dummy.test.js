const listHelper = require('../utils/list_helper')
const blogs = require('./blogsData')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(6)
})
