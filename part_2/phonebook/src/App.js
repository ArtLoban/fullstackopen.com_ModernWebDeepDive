import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim();
    const trimmedPhone = newPhone.trim();

    if(trimmedName.length === 0 || trimmedPhone.length === 0) return

    const found = persons.find(person => person.name === trimmedName);

    if (typeof found !== 'undefined') {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    setPersons([...persons, {name: trimmedName, phone: trimmedPhone}])
    setNewName('')
    setNewPhone('')
  }

  const renderPhones = () => {
    return persons.map((person, i) => {
      return <p key={person.name + i}>{person.name} {person.phone}</p>
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <div>
            name: <input value={newName} onChange={e => setNewName(e.target.value)} />
          </div>
          <div>
            number: <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderPhones()}
    </div>
  )
}

export default App