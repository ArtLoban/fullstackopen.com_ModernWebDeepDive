import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    setPersons([...persons, { name:newName }])
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