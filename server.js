const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const session = require('express-session');
const userPassport = require("./passports/userPassport");
const adminPassport = require("./passports/adminPassport");
const config = require("./extra-config");


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/project3_quiz_game";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const authCheck = require('./middleware/attachAuthenticationStatus');
app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
app.use(userPassport.initialize());
app.use(userPassport.session());
app.use(adminPassport.initialize());
app.use(adminPassport.session());
app.use(authCheck);

// Define API routes here
app.use("/api", apiRoutes);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
