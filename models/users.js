const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: String,
    email_verified: Boolean,
    name: String,
    nickname: String,
    picture: String,
    sub: String,
    updated_at: String,
    watch_list: Object,
  },
  {
    collection: "userData",
  }
);

const model = mongoose.model("users", User, "userData");

module.exports = model;
