const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    unique_Id: Number,
    name: String,
    email: String,
    password: String,
    watch_list: Object,
  },
  {
    collection: "userData",
  }
);

const model = mongoose.model("users", User, "userData");

module.exports = model;
