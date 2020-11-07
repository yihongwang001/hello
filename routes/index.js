var express = require("express");
const app = require("../app");
var session = require("express-session");
// import connectStore from "connect-mongo";
var router = express.Router();

const myDB = require("../db/myMongoDb.js");

//Gets the register page

router.get("/users", async (req, res) => {
  const posts = await myDB.getUsers();
  res.json(posts);
});

// This is done later on but this is the correct way. This is how he did it in h
router.post("/register", async (req, res) => {
  const { firstName, lastName, password } = req.body;
  const query = { first: firstName, last: lastName, password: password };

  // res.send(req.session.user);
  await myDB.insertUser(query);
});

//need this at the end of js files
module.exports = router;
