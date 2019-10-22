// Create a User schema and model 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema({
  name: String,
  password: String
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);