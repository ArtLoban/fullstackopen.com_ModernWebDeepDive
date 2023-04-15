import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(() => 0))

  const handleNext = () => {
    if (anecdotes.length < 2) return;

    let randomIndex = getRandomIndex()

    while (randomIndex === selected) {
      randomIndex = getRandomIndex()
    }

    setSelected(randomIndex)
  }

  const getRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;

    setPoints(newPoints)
  }

  const getTopVoted = () => {
    const maxValue = Math.max(...points);

    if (maxValue === 0 ) return

    const index = points.reduce((accumulator, votes, index) => {
      return votes > points[accumulator] ? index : accumulator;
    }, 0);

    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[index]}</p>
        <p>Has {points[index]} votes</p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has { points[selected] || 0 } votes</p>
        <div>
          <button onClick={handleVote}>Vote</button>
          <button onClick={handleNext}>Next Anecdote</button>
        </div>
      </div>
      {getTopVoted()}
    </div>
  )
}

export default App