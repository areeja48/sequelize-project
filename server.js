const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());
//const app = express();


const db = require("./models");
const Role = db.role;

db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
 Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "first-session",
    keys: ["TASTY_BISCUIT"], // should use as secret environment variable
    httpOnly: true,
  })
);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Application." });
});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});