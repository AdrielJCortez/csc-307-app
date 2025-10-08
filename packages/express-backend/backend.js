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

import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const removeUser = (id) => {
    const idx = users["users_list"].findIndex(u => u.id === id);
    if (idx === -1)
        return null;
    const [removed] = users["users_list"].splice(idx, 1)
    return removed;
}

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name, job) =>
    users["users_list"].filter((u) => u.name === name && u.job === job);

const idInUse = (id) => users["users_list"].some(u => u.id === id);
const generateRandomId = () => {
  let id;
  do {
    id = Math.random().toString(36).slice(2, 8);
  } while (idInUse(id));
  return id;
}

app.use(cors())
app.use(express.json());

app.post("/users", (req, res) => {
    const userToAdd = req.body;

    if (!userToAdd.id){
      userToAdd.id = generateRandomId();
    }
    
    addUser(userToAdd);
    return res.status(201).json(userToAdd);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const removed = removeUser(id);
    if (!removed) return res.status(404).send("Resource not found.");

    res.status(200).json(removed)
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});