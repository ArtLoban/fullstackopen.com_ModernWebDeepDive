import {useState} from 'react';
import { createPerson, updatePerson } from '../services/persons'

const PersonForm = ({ persons, updatePersons }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    const trimmedName = name.trim();
    const trimmedPhone = number.trim();

    if(trimmedName.length === 0 || trimmedPhone.length === 0) return

    const found = persons.find(person => person.name === trimmedName);

    if (typeof found === 'undefined') {
      createPerson({
        name: trimmedName,
        number: trimmedPhone
      }).then(newPerson => {
        updatePersons([...persons, newPerson])
        resetInputs()
      })

      return
    }

    if (found.number === trimmedPhone) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    if (!window.confirm(`${trimmedName} is already added to phonebook. Replace the old number with a new one?`)) {
      return
    }

    updatePerson(found.id, {...found, number:trimmedPhone }).then(updatedPerson => {
      updatePersons(persons.map(person => person.id !== found.id ? person : updatedPerson))
      resetInputs()
    })
  }

  const resetInputs = () => {
    setName('')
    setNumber('')
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <div>
          name: <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          number: <input value={number} onChange={e => setNumber(e.target.value)} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm