const express = require("express");
const router = express.Router();

const State = require("../models/State.js");
const {
  getAllStates,
  getState,
  createState,
  updateState,
  deleteState,
} = require("../controllers/statesController.js");

router.get("/", getAllStates);
router.get("/:id", getState);
router.post("/", createState);
router.put("/:id", updateState);
router.delete("/:id", deleteState);

module.exports = router;
