//Creating Express Server Instance
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "model.db");
const app = express();

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is Running");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//Authenticate Token Middleware

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

//List all tasks

app.get("/tasks/", authenticateToken, async (request, response) => {
  const getTasksQuery = `SELECT * FROM model ORDER BY id;`;
  const taskArray = await db.all(getTaskQuery);
  response.send(taskArray);
});

//Retrieve a single task by ID

app.get("/tasks/:TaskId/", authenticateToken, async (request, response) => {
  const { TaskId } = request.params;
  const getTaskQuery = `SELECT * FROM model WHERE id = ${TaskId}`;
  const task = await db.get(getTaskQuery);
  response.send(task);
});

//Create a new task

app.post("/tasks/", authenticateToken, async (request, response) => {
  const { taskDetails } = request.body;
  const { title, description, date, status } = taskDetails;
  const insertTaskQuery = `INSERT INTO model (title, description, date, status) VALUES (${title},${description},${date},${status});`;
  await db.run(insertTaskQuery);
  response.send("Task Created Successfully");
});

//Update an existing task

app.put("/tasks/:taskId/", authenticateToken, async (request, response) => {
  const { taskId } = request.params;
  const { taskDetails } = request.body;
  const { title, description, date, status } = taskDetails;
  const updateTaskQuery = `UPDATE model SET title=${title},description=${description},date=${date},status=${status} WHERE id = ${taskId};`;
  await db.run(updateTaskQuery);
  response.send("Task Updated Successfully");
});

//Delete a task

app.delete("/tasks/:taskId/", authenticateToken, async (request, response) => {
  const { taskId } = request.params;
  const deleteTaskQuery = `DELETE FROM model WHERE id = ${taskId};`;
  await db.run(deleteTaskQuery);
  response.send("Task Deleted Successfully");
});
