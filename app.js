var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
//will have to install some of these
const cors = require("cors");

//use cors to allow cross origin resource sharing

//The routes take us to the different js pages in routes folder
//Not positive what they do but if you add a new thing in routes folder you have to add it here
var indexRouter = require("./routes/index");
var partyPageRouter = require("./routes/partyPage");

// InitiateMongoServer();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//no idea what all these do
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));

//this is where you add the folder that the routes access
// /party is the place where the homescreen will be
app.use("/", indexRouter);
app.use("/party", partyPageRouter);
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Mixing it up on port ${PORT}`);
// });
// catch 404 and forward to error handler

module.exports = app;
