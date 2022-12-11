const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Movie = require("./models/movies");
const User = require("./models/users");

app.use(express.json());
app.use(cors());
console.log(process.env.node);

mongoose
  .connect(
    "mongodb+srv://admin:admin@movie-recommendation-sy.rv4rtom.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected DB"));

// ENDPOINTS

// add a movie
app.post("/movies", async (req, res) => {
  console.log(req.body);
  try {
    const movie = new Movie({
      title: req.body.title,
      poster_path: req.body.poster_path,
      imdb_id: req.body.imdb_id,
      release_date: req.body.release_date,
      original_language: req.body.original_language,
      status: req.body.status,
      tagline: req.body.tagline,
      runtime: req.body.runtime,
      genres: req.body.genres,
      overview: req.body.overview,
      vote_count: req.body.vote_count,
      vote_average: req.body.vote_average,
      budget: req.body.budget,
      revenue: req.body.revenue,
      popularity: req.body.popularity,
      production_companies: req.body.production_companies,
      production_countries: req.body.production_countries,
    });
    req.header("Content-Type", "application/json");
    movie.save();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(req.body);
  } catch (err) {
    res.json({ status: "error" });
    console.log(err);
  }
});

// get all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (!movies) return res.status(404).json({ error: "Data not Found" });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
});

// add a user
app.post("/users", (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  try {
    const user = new User({
      email: req.body.email,
      email_verified: req.body.email_verified,
      name: req.body.name,
      nickname: req.body.nickname,
      picture: req.body.picture,
      sub: req.body.sub,
      updated_at: req.body.updated_at,
      watch_list: req.body.watch_list,
    });
    user.save();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(req.body);
    // res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
    console.log(err);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
});

// get data by ID
// GET: http://localhost:5000/watchlist/someUserId
app.get("/watchlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await User.findById(id);
    if (data) {
      res.json(data);
    } else {
      res.json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user data...!" });
  }
});

app.get("/", (req, res) => {
  res.send("SERVER RUNNING AT PORT 5000");
});

app.listen(5000, () => {
  console.log("app running");
});

//ANCHOR -  update by id
// PATCH: http://localhost:5000/watchlist/someUserId
app.patch("/watchlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await User.findByIdAndUpdate(id, req.body);
    if (data) {
      res.json(req.body);
    } else if (req.body == undefined) {
      res.json({ error: "Nothing to Update" });
    } else {
      res.json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user data...!" });
  }
});

//ANCHOR -  delete user by id
// DELETE: http://localhost:5000/watchlist/someUserId
app.delete("/watchlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await User.findByIdAndDelete(id);
    if (data) {
      res.json(data);
      // res.json({ message: "Deleted successfully" });
    } else {
      res.json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user data...!" });
  }
});

//ANCHOR -  delete user data by id
// DELETE: http://localhost:5000/watchlist/someUserId
app.delete("/watchlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await User.findOneAndDelete();
    if (data) {
      res.json(data);
      // res.json({ message: "Deleted successfully" });
    } else {
      res.json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user data...!" });
  }
});
