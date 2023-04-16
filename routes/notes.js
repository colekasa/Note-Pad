const express = require("express");
const notesRouter = express.Router();
const {
  readAndAppend,
  readFromFile,
  readAndDelete,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// get route for retrieving all of the notes
notesRouter.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//post route to submit more notes .
notesRouter.post("/", (req, res) => {
  //destructuring all the body of the database information ( the title and text of the note )
  const { title, text } = req.body;

  //if the parameters of title and text are met then.....
  if (title && text) {
    //new variable we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // we append the db with the new note we created
    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "Nice!",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in retrieving the most recent note");
  }
});

notesRouter.delete(`/:id`, (req, res) => {
  const noteId = req.params.id;

  readAndDelete(noteId, "./db/db.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

//get route to retrieve existing notes
notesRouter.get("/", (req, res) => {});

module.exports = notesRouter;
