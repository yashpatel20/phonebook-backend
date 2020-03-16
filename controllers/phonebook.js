const phonebookRouter = require("express").Router();
const Phonebook = require("../models/phonebook");

//GET /info
phonebookRouter.get("/info", (req, res, next) => {
  let noOfEntries = 0;
  let today = new Date();
  Phonebook.find({})
    .then(data => {
      noOfEntries = data.length;
      return res.send(
        `<h3>Phonebook has info for ${noOfEntries} people</h3><h3>${today}</h3>`
      );
    })
    .catch(error => next(error));
});

//GET /api/persons
phonebookRouter.get("/", (req, res, next) => {
  Phonebook.find({})
    .then(data => {
      res.json(data.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

//GET /api/persons/:id
phonebookRouter.get("/:id", (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then(data => {
      if (data) res.json(data.toJSON());
      else res.status(404).end();
    })
    .catch(error => next(error));
});

//POST /api/persons
phonebookRouter.post("/", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "content missing"
    });
  }
  Phonebook.exists({ name: body.name })
    .then(data => {
      if (data) return res.status(404).json({ error: "name must be unique" });
      //add to db
      const entry = new Phonebook({
        name: body.name,
        number: body.number
      });
      entry
        .save()
        .then(savedEntry => {
          res.json(savedEntry.toJSON());
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

//PUT /api/persons
phonebookRouter.put("/:id", (req, res, next) => {
  const body = req.body;
  Phonebook.find({ name: body.name }).then(result => {
    if (result.number === body.number)
      return res.status(404).json({ error: "same number, cant update" });
    //otherwise update
    const entry = {
      name: body.name,
      number: body.number
    };
    Phonebook.findByIdAndUpdate(req.params.id, entry, {
      new: true
    })
      .then(updatedEntry => res.json(updatedEntry.toJSON()))
      .catch(error => next(error));
  });
});

//DELETE /api/persons/:id
phonebookRouter.delete("/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).json(result.toJSON()))
    .catch(error => next(error));
});

module.exports = phonebookRouter;
