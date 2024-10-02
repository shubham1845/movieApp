const { model } = require("mongoose");
const Movie = require("../models/Movie");

module.exports.addComment = async (req, res) => {
  try {
    const movieId = req.params.id; // Movie ID from the URL
    const { commentText } = req.body;

    // Use the user's email or another identifying field from the authenticated user
    const userEmail = req.user.email; // Assuming `req.user` contains the authenticated user's email

    // Find the movie by ID
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // Add the comment
    const newComment = {
      user: userEmail, // Save the user's email instead of `user.name`
      commentText,
    };

    movie.comments.push(newComment); // Push the new comment into the comments array
    await movie.save(); // Save the updated movie document

    res.status(201).json({
      message: "Comment added successfully!",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding comment",
      error: error.message,
    });
  }
};

// Get all comments for a movie
module.exports.getComments = async (req, res) => {
  try {
    const movieId = req.params.id; // Movie ID from the URL

    // Find the movie by ID and populate comments
    const movie = await Movie.findById(movieId).select("comments");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Comments retrieved successfully!",
      comments: movie.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving comments",
      error: error.message,
    });
  }
};

// Create a new movie (Admin only)
module.exports.createMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre } = req.body;

    const newMovie = new Movie({
      title,
      director,
      year,
      description,
      genre,
    });

    await newMovie.save();

    res.status(201).json({
      message: "Movie created successfully!",
      movie: newMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating movie",
      error: error.message,
    });
  }
};

// Update a movie (Admin only)
module.exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true, // Return the updated document
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully!",
      movie: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating movie",
      error: error.message,
    });
  }
};

// Delete a movie (Admin only)
module.exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting movie",
      error: error.message,
    });
  }
};

// Get all movies (accessible by all users)
module.exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Retrieve all movies from the catalog

    res.status(200).json({
      message: "Movies retrieved successfully!",
      movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving movies",
      error: error.message,
    });
  }
};

// Get a single movie by ID (accessible by all users)
module.exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId); // Find the movie by its ID

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie retrieved successfully!",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving movie",
      error: error.message,
    });
  }
};
