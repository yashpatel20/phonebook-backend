const mongoose = require("mongoose");
const password = require("./password");

if (process.argv.length < 3) {
  console.log("give password as arg");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-umicp.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//schema
const phoneboookSchema = new mongoose.Schema({
  name: String,
  number: String
});

//model
const Phonebook = mongoose.model("Phonebook", phoneboookSchema);

if (process.argv.length === 3) {
  Phonebook.find({}).then(res => {
    res.forEach(note => console.log(note));
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const entry = new Phonebook({
    name: process.argv[3],
    number: process.argv[4]
  });

  entry.save().then(res => {
    console.log("entry saved");
    mongoose.connection.close();
  });
}
