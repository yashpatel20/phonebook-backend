require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");

//notes array
let phonebook = [
  { name: "Yash Patel", number: "9106377186", id: 1 },
  { name: "Neel Patel", number: "9148324832", id: 2 },
  { name: "Varsha Patel", number: "4838548483", id: 3 },
  { name: "Harshad Patel", number: "485435222", id: 4 },
  { name: "Mohan", number: "914843483748", id: 5 }
];

//middleware
app.use(express.static("build"));
//cors
app.use(cors());
//morgan
app.use(morgan("tiny"));
//bodyparser
app.use(bodyParser.json());

//GET /info
app.get("/info", (req, res) => {
  let noOfEntries = 0;
  let today = new Date();
  Phonebook.find({}).then(data => {
    noOfEntries = data.length;
    return res.send(
      `<h3>Phonebook has info for ${noOfEntries} people</h3><h3>${today}</h3>`
    );
  });
});

//GET /api/persons
app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then(data => {
    res.json(data.map(person => person.toJSON()));
  });
});

//GET /api/persons/:id
app.get("/api/persons/:id", (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then(data => {
      if (data) res.json(data.toJSON());
      else res.status(404).end();
    })
    .catch(error => next(error));
});

//POST /api/persons
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "content missing"
    });
  }
  Phonebook.exists({ name: body.name }).then(data => {
    if (data) return res.status(404).json({ error: "name must be unique" });
    //add to db
    const entry = new Phonebook({
      name: body.name,
      number: body.number
    });
    entry.save().then(savedEntry => {
      res.json(savedEntry.toJSON());
    });
  });
});

//ERROR
//PUT /api/persons
app.put("/api/persons/:id", (req, res) => {
  const entry = req.body;
  const findPerson = phonebook.find(person => person.name === entry.name);
  if (findPerson.number === entry.number)
    return res.status(404).json({ error: "same number, cant update" });
  findPerson.number = entry.number;
  res.json(findPerson);
});

//DELETE /api/persons/:id
app.delete("/api/persons/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).json(result.toJSON()))
    .catch(error => next(error));
  // const entry = phonebook.find(entry => entry.id === id);
  // if (entry) {
  //   const index = phonebook.indexOf(entry);
  //   phonebook.splice(index, 1);
  //   res.json(phonebook);
  // } else {
  //   res.status(404).end();
  // }
});

//unknown endpoints
const unknownEndPoint = (req, res) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);

//Error Handlers
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running");
});
