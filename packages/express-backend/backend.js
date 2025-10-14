// backend.js
// How to add:
// curl -X POST http://localhost:8000/users ^
//  -H "Content-Type: application/json" ^
//  -d "{\"id\":\"qwe123\",\"name\":\"Cindy\",\"job\":\"Zookeeper\"}"
// To confirm:
// curl http://localhost:8000/users

// How to Delete by id:
// curl -X DELETE http://localhost:8000/users/qwe123
// Verify List:
// curl http://localhost:8000/users

// "http://localhost:8000/users?name=Mac&job=Bouncer"

// packages/express-backend/backend.js
// packages/express-backend/backend.js
import express from "express";
import cors from "cors";
import services from "./services/user-services.js"; // default import

const { getUsers, findUserById, addUser, deleteUserById } = services;

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// GET /users (all | ?name= | ?job= | ?name=&job=)
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  getUsers(name, job)
    .then(docs => res.json({ users_list: docs }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    });
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then(doc => {
      if (!doc) return res.status(404).send("Resource not found.");
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("Invalid id");
    });
});

// POST /users (201 + created doc with _id)
app.post("/users", (req, res) => {
  const { name, job } = req.body;
  if (!name || !job) return res.status(400).json({ error: "name and job are required" });
  addUser({ name, job })
    .then(doc => res.status(201).json(doc))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    });
});

// DELETE /users/:id (204 or 404)
app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then(doc => {
      if (!doc) return res.status(404).send("Resource not found.");
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("Invalid id");
    });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
