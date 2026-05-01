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
router.get("/:state", getState);
router.post("/", createState);
router.put("/:state", updateState);
router.delete("/:state", deleteState);

module.exports = router;
