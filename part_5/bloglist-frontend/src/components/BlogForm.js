import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, updateBlogs }) => {
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
    } catch (e) {
      console.log(e.message);
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
