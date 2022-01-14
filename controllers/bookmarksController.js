// bookmarksController.js
// Dependencies

const express = require("express");
const { request } = require("../app");
// Files
const bookmarksArray = require("../models/bookmark");

// `.Router` creates a new controller
// that handles a sub-route.
// In this case, it will handle everything
// that starts with `/bookmarks`.
const bookmarks = express.Router();

// Routes
// The "/bookmarks" part of the route is already assumed because app.js
// has delegated it to us with its `app.use` line. So we just need "/"
// as our route here, and it's still /bookmarks.

// GET all bookmarks
bookmarks.get("/", (_, response) => {
  console.log("GET request to /bookmarks");
  response.json(bookmarksArray);
});

// Get one bookmark by index
// GET /bookmarks/:index
// A request to /bookmarks/1
// will result in request.params.index having the value of 1
// bookmarks.get("/:index", (request,response) => {
//   const { index } = request.params
//     response.json(index);
// });

// bookmarks.get("*", (request, response) => {
  //   response.status(404).json({ error: 'Resource not found' })
  // })

  // OUR TASK
  // Use `request.params.index` to send back the bookmark in our bookmarksArray at that index.
  // TIP: you should send it back as JSON
  // BONUS: send a 404 *if* the index doesn't exist in our bookmarksArray
  bookmarks.get("/:index", (request,response) => {
    const { index } = request.params
    if (!bookmarksArray[index]) {
      response.status(404).json({ error: 'Resource not found' })
    } else {
      response.json(bookmarksArray[index])
    }
  });
  
// Create one bookmark
// POST /bookmarks (the '/bookmarks' is already there, app.js is delegating it to us)
// A request to POST /bookmarks will need to include WHAT to add
// POST to /bookmarks... but post WHAT? post THIS to bookmarks
bookmarks.post("/", (request, response) => {
  bookmarksArray.push(request.body);
  response.status(201).json(bookmarksArray);
  // response.send(request.body);
});


// DELETE
bookmarks.delete("/:index",(request,response) => {
  const { index } = request.params;
  if(bookmarksArray[index]){
    const [ deletedBookmark ] = bookmarksArray.splice(index, 1);
    response.status(200).json(deletedBookmark);
  } else {
    response.status(404).json({ error: 'Bookmark not found' })
  };
});

// UPDATE
bookmarks.put("/:index", (request, response) => {
  // bookmarksArray[request.params.index] = request.body;
  bookmarksArray.splice(request.params.index, 1, request.body )
  response.status(200).json(bookmarksArray);
});




// YOUR TASK:
// finish this post request!
// - get the new bookmark (on `request.body`) into our array.
// Send back the whole bookmarks array as JSON - it should include our new bookmark!
// BONUS: send a 201 ("Created") HTTP status code.
  
// Export the bookmarks controller/router
// so that `app` can delegate the `/bookmarks`
// route to it.
module.exports = bookmarks;