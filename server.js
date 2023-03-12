const express = require("express");
const path = require("path");
const api = require("./routes/index");
const { clog } = require("./middleware/middleware");

const PORT = process.env.PORT || 3001;

const app = express();

//import  cutom middleware
app.use(clog);

//import boilerplate middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// note taking home page get route
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//get route for note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"))
);

//wildcard get route that takes you back to the homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
