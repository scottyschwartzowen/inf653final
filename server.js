require("dotenv").config();
const path = require("path");

// define my local port
const PORT = process.env.PORT || 3500;
const DATABASE_URI = process.env.DATABASE_URI;

// essential imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// import connect
const connectDB = require("./config/dbConn.js");
// import cors options
const corsOptions = require("./config/corsOptions.js");
// import models
const State = require("./models/State.js");

// import routes
const stateRoute = require("./routes/states.js");

/*  MIDDLEWARE  */
// express middleware - CORS
app.use(cors(corsOptions));
// express middleware - JSON
app.use(express.json());
// express middleware - Form fields (formURLencoded)
app.use(express.urlencoded({ extended: false }));

/*  ROUTES  */
app.use("/states", stateRoute);

// check database_uri exists
if (!DATABASE_URI) {
  console.error("Missing DATABASE_URI in .env file");
  process.exit(1);
}

// catch all if incorrect route (Express v5 version)
app.all("/{*splat}", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// connect to database & listen for PORT
mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log("Connected to MongoDB database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection to MongoDB database failed!", error.message);
  });
