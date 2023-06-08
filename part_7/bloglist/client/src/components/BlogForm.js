import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import styled from 'styled-components'

const Button = styled.button`
  background: #87c0de;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00a2f8;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const onFormSubmit = async (e) => {
    e.preventDefault()

    dispatch(createBlog({title, author, url}))

    setTitle('')
    setAuthor('')
    setURL('')
    blogFormRef.current.toggleVisibility()

    const notification = {
      body: `A new blog ${title} by ${author} added`,
      status: 'success',
    }
    dispatch(setNotification(notification))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>title: <Input value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div>author: <Input value={author} onChange={e => setAuthor(e.target.value)} /></div>
        <div>url: <Input value={url} onChange={e => setURL(e.target.value)} /></div>
        <Button>Create</Button>
      </form>
    </div>
  )
}

export default BlogForm
