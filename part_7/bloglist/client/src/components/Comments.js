import CommentForm from './CommentForm'

const Comments = ({ comments }) => {

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm />
      <ul>
        {
          comments.map(comment => <li key={comment.id}>{comment.content}</li>)
        }
      </ul>
    </div>
  )
}

export default Comments