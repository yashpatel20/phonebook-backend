require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Phonebook = require("./models/phonebook")

//middleware
app.use(express.static("build"))
//cors
app.use(cors())
//morgan
app.use(morgan("tiny"))
//bodyparser
app.use(bodyParser.json())

//GET /info
app.get("/info", (req, res, next) => {
  let noOfEntries = 0
  let today = new Date()
  Phonebook.find({})
    .then(data => {
      noOfEntries = data.length
      return res.send(
        `<h3>Phonebook has info for ${noOfEntries} people</h3><h3>${today}</h3>`
      )
    })
    .catch(error => next(error))
})

//GET /api/persons
app.get("/api/persons", (req, res, next) => {
  Phonebook.find({})
    .then(data => {
      res.json(data.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

//GET /api/persons/:id
app.get("/api/persons/:id", (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then(data => {
      if (data) res.json(data.toJSON())
      else res.status(404).end()
    })
    .catch(error => next(error))
})

//POST /api/persons
app.post("/api/persons", (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "content missing"
    })
  }
  Phonebook.exists({ name: body.name })
    .then(data => {
      if (data) return res.status(404).json({ error: "name must be unique" })
      //add to db
      const entry = new Phonebook({
        name: body.name,
        number: body.number
      })
      entry
        .save()
        .then(savedEntry => {
          res.json(savedEntry.toJSON())
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

//PUT /api/persons
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body
  Phonebook.find({ name: body.name }).then(result => {
    if (result.number === body.number)
      return res.status(404).json({ error: "same number, cant update" })
    //otherwise update
    const entry = {
      name: body.name,
      number: body.number
    }
    Phonebook.findByIdAndUpdate(req.params.id, entry, {
      new: true
    })
      .then(updatedEntry => res.json(updatedEntry.toJSON()))
      .catch(error => next(error))
  })
})

//DELETE /api/persons/:id
app.delete("/api/persons/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).json(result.toJSON()))
    .catch(error => next(error))
})

//unknown endpoints
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndPoint)

//Error Handlers
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError" && error.kind === "ObjectId")
    return response.status(400).send({ error: "malformatted id" })
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message })

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("server is running")
})
