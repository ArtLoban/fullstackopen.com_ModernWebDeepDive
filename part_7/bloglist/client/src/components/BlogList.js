import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ updateBlogs, user }) => {
  const blogs = useSelector(({ blogs }) => {
    if (blogs) {
      return [...blogs].sort((a,b) => b.likes - a.likes)
    }

    return []
  })

  return (
    <div >
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} updateBlogs={updateBlogs} user={user} />)
      }
    </div>
  )
}

export default BlogList
