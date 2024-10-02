const express = require("express");

const movieController = require("../controllers/movie");

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Public route to get all movies (accessible by all users)
router.get("/getMovies", movieController.getMovies);

// Public route to get a single movie by ID (accessible by all users)
router.get("/getMovie/:id", movieController.getMovieById);
// Create a movie (Admin only)
router.post("/addMovie", verify, verifyAdmin, movieController.createMovie);

// Update a movie (Admin only)
router.patch("/update/:id", verify, verifyAdmin, movieController.updateMovie);

// Delete a movie (Admin only)
router.delete("/delete/:id", verify, verifyAdmin, movieController.deleteMovie);

// Route to add a comment to a movie (protected route)
router.patch("/movie/:id/comments", verify, movieController.addComment);

// Route to get comments from a movie
router.get("/movie/:id/comments", verify, movieController.getComments);
module.exports = router;
