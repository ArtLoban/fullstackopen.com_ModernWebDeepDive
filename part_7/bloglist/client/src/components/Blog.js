import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({blog, user }) => {
  const dispatch = useDispatch()
  const [visible, toggleVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const blogData = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(blogData))
    } catch (e) {
      console.log(e.message); // TODO: Show error message
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
      } catch (e) {
        console.log(e.message); // TODO: Show error message
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} by {blog.author}</span>
        <button
          onClick={() => toggleVisible(!visible)}
          style={{marginLeft: '10px'}}
          type="button"
        >{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible &&
        <div>
          <span>{blog.url}</span>
          <div>
            <span>likes {blog.likes}</span>
            <button type="button" onClick={handleLike} style={{marginLeft: '10px'}}>Like</button>
          </div>
          <span>{blog.user?.name}</span>

          {
            blog.user?.username === user?.username &&
            <div>
              <button type="button" onClick={handleDelete}>Remove</button>
            </div>
          }

        </div>
      }
    </div>
  )
}

export default Blog
