import { useState } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = ({ numbers }) => {
  const [persons, setPersons] = useState(numbers)
  const [term, newTerm] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} handleChange={newTerm} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} addPerson={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} term={term} />
    </div>
  )
}

export default App