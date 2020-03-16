require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("connected to mongoDB"))
  .catch(error => console.log("error connecting to mongoDB", error.message));

//Schema
const phoneboookSchema = new mongoose.Schema({
  name: String,
  number: String
});

phoneboookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
//model
module.exports = mongoose.model("Phonebook", phoneboookSchema);
