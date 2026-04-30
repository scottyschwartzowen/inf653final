const express = require("express");
const router = express.Router();

const State = require("../models/State.js");
const {
  getStates,
  getState,
  createState,
  updateState,
  deleteState,
} = require("../controllers/statesController.js");

router.get("/", getStates);
router.get("/:id", getState);
router.post("/", createState);
router.put("/:id", updateState);
router.delete("/:id", deleteState);

module.exports = router;
