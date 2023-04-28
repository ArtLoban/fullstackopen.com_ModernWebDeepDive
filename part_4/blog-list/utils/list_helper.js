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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
