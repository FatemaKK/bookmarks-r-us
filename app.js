// app.js
// Files
const bookmarksController = require("./controllers/bookmarksController");
// DEPENDENCIES
const express = require("express");

// Create the Express app.
const app = express();

// Delegate everything that starts with `/bookmarks` to the bookmarks controller.
// .use takes in two arguments:
// - the sub-route for the controller to handle
// - the controller that should handle it
// Read as a sentence: "For any route that starts with "/bookmarks", use the bookmarks controller."

// JSON-parsing middleware
// For every request, parse information as JSON
app.use(express.json())

app.use("/bookmarks", bookmarksController);


// The home route.
app.get("/", (request, response) => {
  console.log("GET request to /");
  response.send("Welcome to Bookmarks 'R' Us");
});

// Star (*) matches anything we haven't matched yet.
app.get("*", (request, response) => {
  response.status(404).json({ error: "Page not found" });
});

// Export our app for `server.js`.
module.exports = app;
