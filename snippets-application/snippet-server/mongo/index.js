// This file should run with: node lab3.js
const mongoose = require("mongoose");

// BUILD THE MONGO URI CONNECTION STRING
const { username, password, projectname } = require("../config.json");
// const mongoUrl = `mongodb+srv://prsurya1020:1234@cluster0.g9wbkot.mongodb.net/?retryWrites=true&w=majority`;
const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.g9wbkot.mongodb.net/?retryWrites=true&w=majority`;

// CONNECT TO MONGO DB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
