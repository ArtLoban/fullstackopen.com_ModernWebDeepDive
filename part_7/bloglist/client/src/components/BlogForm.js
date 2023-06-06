import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogs, updateBlogs, blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const onFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBlog = await blogService.create({title, author, url})

      updateBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setURL('')
      blogFormRef.current.toggleVisibility()

      const notification = {
        body: `A new blog ${title} by ${author} added`,
        status: 'success',
      }
      dispatch(setNotification(notification))

    } catch (e) {
      console.log(`Caught error: ${e.message}`);
      console.log('e.response.data: ', e.response.data);

      const notification = {
        body: e.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000
      }
      dispatch(setNotification(notification))
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>title: <input value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div>author: <input value={author} onChange={e => setAuthor(e.target.value)} /></div>
        <div>url: <input value={url} onChange={e => setURL(e.target.value)} /></div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
