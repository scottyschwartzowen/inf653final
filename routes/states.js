const express = require("express");
const router = express.Router();

const State = require("../models/State.js");
const {
  getAllStates,
  getState,
  getFunFact,
  createFunFact,
  updateFunFact,
  deleteFunFact,
} = require("../controllers/statesController.js");

router.get("/", getAllStates);
router.get("/:state", getState);
router.get("/:state/funfact", getFunFact);
router.post("/:state/funfact", createFunFact);
router.put("/:state/funfact", updateFunFact);
router.delete("/:state/funfact", deleteFunFact);

module.exports = router;
