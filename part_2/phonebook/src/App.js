import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim();

    if(trimmedName.length === 0) return

    const found = persons.find(person => person.name === trimmedName);

    if (typeof found !== 'undefined') {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    setPersons([...persons, {name:trimmedName}])
    setNewName('')
  }

  const renderNames = () => {
    return persons.map((person, i) => <p key={person.name + i}>{person.name}</p>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderNames()}
    </div>
  )
}

export default App