const mongo = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    'Please provide the password as an argument:\nnode mongo.js <password> <name> <phone> to add entry\nnode mongo.js <password> to list entries'
  )
  process.exit(1)
}

const password = process.argv[2]

mongo.connect(
  `mongodb+srv://mwelsherbiny:${password}@cluster0.edsvf.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
)

const personSchema = new mongo.Schema({
  name: String,
  number: String,
})

const Person = mongo.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log('Person saved')
    mongo.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongo.connection.close()
  })
}
