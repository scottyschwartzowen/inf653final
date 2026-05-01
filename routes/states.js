const express = require("express");
const router = express.Router();

const State = require("../models/State.js");
const {
  getAllStates,
  getState,
  getFunFact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
  createFunFact,
  updateFunFact,
  deleteFunFact,
} = require("../controllers/statesController.js");

router.get("/", getAllStates);
router.get("/:state", getState);
router.get("/:state/funfact", getFunFact);
router.get("/:state/capital", getCapital);
router.get("/:state/nickname", getNickname);
router.get("/:state/population", getPopulation);
router.get("/:state/admission", getAdmission);
router.post("/:state/funfact", createFunFact);
router.patch("/:state/funfact", updateFunFact);
router.delete("/:state/funfact", deleteFunFact);

module.exports = router;
