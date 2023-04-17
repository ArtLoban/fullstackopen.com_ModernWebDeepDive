import {useState} from 'react';
import { create as createPerson } from '../services/persons'

const PersonForm = ({ persons, addPerson }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    const trimmedName = name.trim();
    const trimmedPhone = number.trim();

    if(trimmedName.length === 0 || trimmedPhone.length === 0) return

    const found = persons.find(person => person.name === trimmedName);

    if (typeof found !== 'undefined') {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    createPerson({
      name: trimmedName,
      number: trimmedPhone
    }).then(newPerson => {
      addPerson  ([...persons, newPerson])
      setName('')
      setNumber('')
    })
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