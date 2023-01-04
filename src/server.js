//Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
//Include the cors middleware
const cors = require("cors");

//Create a new express application
const app = express();

//Tell express we want to use the morgan library
app.use(morgan("dev"));
//Tell express we want to use the cors library
app.use(cors());
//Tell express to parse JSON in the request body
app.use(express.json());

const tasks = [
  {
    id: 1,
    text: "wash the dishes",
    status: "incomplete",
  },
  {
    id: 2,
    text: "mop the floor",
    status: "incomplete",
  },
];

// // READ
// GET ALL TASKS: GET http://localhost:3030/tasks
app.get("/tasks", (req, res) => {
  // 1. send back a response with all tasks
  res.json(tasks);
});

// GET A SPECIFIC TASK ( BY ID ): GET http://localhost:3030/tasks/2
app.get("/tasks/:id", (req, res) => {
  // 1. extract the data from the request parameter
  // 2. convert to number
  const id = Number(req.params.id);
  // 3. find the corresponding array item with that id from tasks
  const task = tasks.find((item) => item.id === id);
  // 4. send it back in the response
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const id = tasks.length + 1;
  const task = { id, ...req.body };
  tasks.push(task);
  res.json(task);
});

// Update the task by id
app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);
  task.text = req.body.text;
  res.json(task);
});
// Delete the task by id
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);
  tasks.splice(tasks.indexOf(task), 1);
  res.json(task);
});
module.exports = app;
