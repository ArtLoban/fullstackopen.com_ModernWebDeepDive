
const Filter = ({ term, handleChange }) => {
  return (
    <div>
      Filter shown with: <input value={term} onChange={e => handleChange(e.target.value)} />
    </div>
  )
}

export default Filter