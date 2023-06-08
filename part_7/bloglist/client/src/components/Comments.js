const Comments = ({ comments }) => {
  if (comments.length === 0) return null

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {
          comments.map(comment => <li key={comment.id}>{comment.content}</li>)
        }
      </ul>
    </div>
  )
}

export default Comments