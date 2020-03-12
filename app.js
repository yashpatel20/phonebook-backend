const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

//notes array
let phonebook = [
  { name: "Yash Patel", number: "9106377186", id: 1 },
  { name: "Neel Patel", number: "9148324832", id: 2 },
  { name: "Varsha Patel", number: "4838548483", id: 3 },
  { name: "Harshad Patel", number: "485435222", id: 4 },
  { name: "Mohan", number: "914843483748", id: 5 }
];

//middleware
morgan.token("json", req => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :json")
);
app.use(bodyParser.json());

app.get("/info", (req, res) => {
  let noOfEntries = phonebook.length;
  let today = new Date();
  res.send(
    `<h3>Phonebook has info for ${noOfEntries} people</h3><h3>${today}</h3>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = phonebook.find(entry => entry.id === id);
  if (entry) res.json(entry);
  else res.status(404).end();
});

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

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
  res.json(phonebook);
});

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running");
});
