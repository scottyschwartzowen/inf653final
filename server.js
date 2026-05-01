require("dotenv").config();

// define my local port
const PORT = process.env.PORT || 3500;
const DATABASE_URI = process.env.DATABASE_URI;

// essential imports
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// import connect
const connectDB = require("./config/dbConn.js");

// import models
const State = require("./models/State.js");

// import routes
const stateRoute = require("./routes/states.js");

/*  MIDDLEWARE  */
// express middleware - JSON
app.use(express.json());
// express middleware - Form fields (formURLencoded)
app.use(express.urlencoded({ extended: false }));

/*  ROUTES  */
app.use("/states", stateRoute);

// http request test
app.get("/", (req, res) => {
  res.send("Hey there!");
});

// // PUT (findByIdAndUpdate) Single State route
// app.put('/states/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const state = await State.findByIdAndUpdate(id, req.body);

//     if (!state) {
//       return res.status(404).json({ message: 'State not found' });
//     }
//     // re-check update success in database
//     const updatedState = await State.findById(id);
//     res.status(200).json(updatedState);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // DELETE (findByIdAndDelete) Single State route
// app.delete('/states/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const state = await State.findByIdAndDelete(id);

//     if (!state) {
//       return res.status(404).json({ message: 'State not found' });
//     }
//     res.status(200).json({ message: 'State deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
