import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { removeBlog, updateBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const BlogSingle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const blogId = params?.id

  const user = useSelector(({ user }) => user)
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === blogId))

  if (!blog) return null

  const handleLike = () => {
    try {
      const blogData = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(blogData))
    } catch (e) {
      console.log(e.message); // TODO: Show error message
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
        navigate('/')
      } catch (e) {
        console.log(e.message); // TODO: Show error message
      }
    }
  }

  return (
    <div>
      <h2>{ blog.title }</h2>

      <a href={blog.url}>{ blog.url }</a>
      <div>
        <span>likes {blog.likes}</span>
        <button type="button" onClick={handleLike} style={{marginLeft: '10px'}}>Like</button>
      </div>
      <span>Added by {blog.user.name}</span>
      {
        blog.user?.username === user?.username &&
        <div>
          <button type="button" onClick={handleDelete}>Remove</button>
        </div>
      }
      <Comments comments={blog.comments} />

      <p>
        <Link to="/">back</Link>
      </p>
    </div>
  )
}

export default BlogSingle
