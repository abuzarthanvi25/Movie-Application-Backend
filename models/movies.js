const mongoose = require("mongoose");

const Movie = new mongoose.Schema(
  {
    adult: Boolean,
    backdrop_path: String,
    belongs_to_collection: Boolean,
    budget: Number,
    title: String,
    poster_path: String,
    homepage: String,
    id: Number,
    imdb_id: String,
    release_date: String,
    original_title: String,
    spoken_languages: Object,
    original_language: String,
    status: String,
    tagline: String,
    runtime: Number,
    genres: Object,
    overview: String,
    vote_count: Number,
    vote_average: Number,
    video: Boolean,
    popularity: Number,
    production_companies: Object,
    production_countries: Object,
    revenue: Number,
  },
  {
    collection: "movieData",
  }
);

const model = mongoose.model("movie", Movie, "movieData");
// "movieData", Movie

module.exports = model;
