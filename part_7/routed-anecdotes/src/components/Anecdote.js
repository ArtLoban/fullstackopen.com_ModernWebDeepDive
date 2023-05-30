
const Anecdote = ({ anecdote }) => {
  return (
    <div style={{marginBottom: "20px"}}>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>Has {anecdote.votes} votes</div>
      <div>For more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote
