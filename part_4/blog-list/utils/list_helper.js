const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikedBlog = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = blogs[i]
    }
  }

  const { title, author, likes } = mostLikedBlog

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const blogsCountByAuthor = _.countBy(blogs, 'author')    // Data model: {'Michael Chan': 1,'Robert C. Martin': 3}
  const authorsArray = Object.keys(blogsCountByAuthor)

  let topAuthor = authorsArray.reduce((a, b) => {
    return blogsCountByAuthor[a] > blogsCountByAuthor[b] ? a : b
  })

  return {
    author: topAuthor,
    blogs: blogsCountByAuthor[topAuthor]
  }
}

// @see screen info: https://i.imgur.com/mGpQ8rh.png
const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')    // Group the blogs by author
  const authorLikes = _.map(grouped, (blogs, author) => {
    return {
      author: author,
      likes: _.sumBy(blogs, 'likes')    //  Total number of likes for each author
    }
  })
  const sorted = _.orderBy(authorLikes, 'likes', 'desc')

  return sorted[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
