import {useState} from 'react';

const PersonForm = ({ persons, addPerson }) => {
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

    addPerson([...persons, {name: trimmedName, phone: trimmedPhone}])
    setNewName('')
    setNewPhone('')
  }

  return (
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
  )
}

export default PersonForm