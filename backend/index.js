require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'invalid_id_format' })
  }
  if (error.name === 'ValidationError') {
    return response
      .status(400)
      .json({ error: 'invalid_date', message: error.message })
  }

  next(error)
}

morgan.token('body', function (req) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findOne({ _id: id })
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({
          error: 'person_not_found',
          message: 'no person with this id was found',
        })
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json({ id })
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  Person.find({})
    .countDocuments()
    .then((count) => {
      res.send(`<p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>`)
    })
})

app.post('/api/persons', express.json(), (req, res, next) => {
  let person = req.body
  if (person.name && person.number) {
    person = new Person({
      name: person.name,
      number: person.number,
    })
    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson)
      })
      .catch((error) => next(error))
  } else {
    res.status(400).json({
      error: 'missing_fields',
      message: 'name and number are required',
    })
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = req.body
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`)
})
