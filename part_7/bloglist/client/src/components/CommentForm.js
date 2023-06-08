import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux';

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const params = useParams()
  const blogId = params?.id

  const handleSubmit = (e) => {
    e.preventDefault()

    if (comment.trim().length === 0) {
      alert('Field can\'t be empty!')
      return null
    }
    dispatch(addComment({id: blogId, content: comment}))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          name="Username"
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}

export default CommentForm