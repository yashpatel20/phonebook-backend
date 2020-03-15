const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

//notes array
let phonebook = [
  { name: "Yash Patel", number: "9106377186", id: 1 },
  { name: "Neel Patel", number: "9148324832", id: 2 },
  { name: "Varsha Patel", number: "4838548483", id: 3 },
  { name: "Harshad Patel", number: "485435222", id: 4 },
  { name: "Mohan", number: "914843483748", id: 5 }
];

//middleware
//cors
app.use(cors());
//morgan
app.use(morgan("tiny"));
//bodyparser
app.use(bodyParser.json());

//GET /info
app.get("/info", (req, res) => {
  let noOfEntries = phonebook.length;
  let today = new Date();
  res.send(
    `<h3>Phonebook has info for ${noOfEntries} people</h3><h3>${today}</h3>`
  );
});

//GET /api/persons
app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

//GET /api/persons/:id
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = phonebook.find(entry => entry.id === id);
  if (entry) res.json(entry);
  else res.status(404).end();
});

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

//POST /api/persons
app.post("/api/persons", (req, res) => {
  const entry = req.body;
  if (!entry.name || !entry.number) {
    return res.status(404).json({
      error: "content missing"
    });
  }
  const notUniqueName = phonebook.find(phone => phone.name === entry.name);

  if (notUniqueName)
    return res.status(404).json({ error: "name must be unique" });

  entry.id = generateId(10, 100);
  //add to array
  phonebook.push(entry);
  res.json(entry);
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
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = phonebook.find(entry => entry.id === id);
  if (entry) {
    const index = phonebook.indexOf(entry);
    phonebook.splice(index, 1);
    res.json(phonebook);
  } else {
    res.status(404).end();
  }
});

//unknown endpoints
const unknownEndPoint = (req, res) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server is running");
});
