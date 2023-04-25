const mongoose = require('mongoose')

const argsCount = process.argv.length;

if (argsCount < 3 || process.argv[2].trim().length === 0) {
  console.log('Give MongoDB password value as a third argument!')
  process.exit(1)
}

if (argsCount === 3) {
  handleRequest('fetchAll')

} else if (argsCount < 5) {
  console.log('Give Person name as a forth argument!')
  console.log('Give phone number value as a fifth argument!')
  process.exit(1)

} else if (argsCount >= 5) {
  handleRequest('create', {
    name: process.argv[3],
    number: process.argv[4],
  })

} else {
  console.log('Nothing here. Please provide proper arguments in order to perform an action.')
  process.exit(1)
}

function handleRequest(type = '', data = {}) {
  const password = process.argv[2]
  const url = `mongodb+srv://artDev:${password}@notesapp.ojbxhql.mongodb.net/phonebookApp?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  if (type === 'fetchAll') {
    Person.find({}).then(result => {
      renderPhonebook(result)

      mongoose.connection.close()
      process.exit(1)
    })
  }

  if (type === 'create') {
    const {name, number} = data
    const person = new Person({name, number})

    person.save().then(result => {
      console.log(`Added ${result?.name} number ${result?.number} to phonebook`)

      mongoose.connection.close()
      process.exit(1)
    })
  }
}

function renderPhonebook($items) {
  console.log('phonebook:')

  if ($items.length === 0) {
    console.log('No records yet')
    return
  }

  $items.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
}
