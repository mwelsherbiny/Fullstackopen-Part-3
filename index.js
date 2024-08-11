const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('post', function (req, res) { 
    if (req.method == 'POST' ) return JSON.stringify(req.body) 
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (!person) 
    {
        res.status(404).end()
    }
    else 
    {
        res.json(person)
    }
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${Date()}<p>`
    )
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    const body = req.body 
    if (!req.body.name || !req.body.number)
    {
        return res.json({error: "The name or number is missing"})
    }
    if (persons.find(person => person.name === req.body.name))
    {
        return res.json({error: "name must be unique"})
    }

    const newPerson = {...body, id: `${Math.floor(Math.random() * 100000)}`}
    persons = persons.concat(newPerson)

    res.json(newPerson)
})

const PORT = 3001
app.listen(PORT)