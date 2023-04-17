const Search = ({ term, setTerm }) => {
  return (
    <div>
      <span>Find countries</span>
      <input value={term} onChange={(e) => setTerm(e.target.value)} />
    </div>
  )
}

export default Search