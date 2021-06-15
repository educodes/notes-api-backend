const express = require("express");
const app = express();
const PORT = 3001;
app.listen(PORT);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: false,
  },
  {
    id: 4,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: false,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello Alice ..</h1>");
});

app.get("/notes", (request, response) => {
  response.json(notes);
});

app.get("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((nt) => {
    return nt.id === id;
  });
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
  console.log(note);
});

app.delete("/notes/:id" , (req , res) => {
   const id = Number(req.params.id);
    note = notes.filter((nt) => {
     return nt.id !== id;
   });
   res.status(204).end()
});