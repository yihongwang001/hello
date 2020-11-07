var express = require("express");
const app = require("../app");
var session = require("express-session");
var router = express.Router();
const myDB = require("../db/myMongoDb.js");
var ObjectId = require("mongodb").ObjectId;
//nothing so far

router.get("/parties", async (req, res) => {
  const parties = await myDB.getParties();
  res.json(parties);
});
//form to upload a new blog

router.post("/new", async (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var cost = req.body.cost;
  var loc = req.body.location;
  var web = req.body.website;
  var dest = req.body.description;
  var authorFirstName = req.body.authorFirstName;
  var authorLastName = req.body.authorLastName;
  var newPartyPlace = {
    name: name,
    image: image,
    cost: cost,
    loc: loc,
    web: web,
    dest: dest,
    authorFirstName: authorFirstName,
    authorLastName: authorLastName,
    commentList: [],
  };
  console.log(newPartyPlace);
  await myDB.insertParty(newPartyPlace);
});
router.post("/comment", async (req, res) => {
  var id = req.body._id;

  var authorFirstName = req.body.authorFirstName;
  var authorLastName = req.body.authorLastName;
  var comment = req.body.comment;
  // var newPartyPlace = {"_id": _id, "authorFirstName": authorFirstName, "authorLastName": authorLastName, "comment": comment};
  var newPartyPlace = [id, authorFirstName, authorLastName, comment];
  await myDB.addComment(newPartyPlace);
});

module.exports = router;
