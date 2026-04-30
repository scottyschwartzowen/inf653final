const State = require("../models/State.js");
const statesData = require("../models/statesData.json");

const getAllStates = async (req, res) => {
  try {
    // pulls all MongoDB docs
    const mongoDox = await State.find({});

    //iterates all 50 states from json
    const merged = statesData.map((state) => {
      // match to mongo doc state codes
      const mongoState = mongoDox.find((doc) => doc.stateCode === state.code);

      // only attach funfacts if exists
      if (mongoState?.funfacts?.length > 0) {
        // spread operator of json fields
        return { ...state, funfacts: mongoState.funfacts };
      }
      return state;
    });
    res.status(200).json(merged);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findById(id);
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByIdAndUpdate(id, req.body);

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    // re-check update success in database
    const updatedState = await State.findById(id);
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByIdAndDelete(id);

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStates,
  getState,
  createState,
  updateState,
  deleteState,
};
