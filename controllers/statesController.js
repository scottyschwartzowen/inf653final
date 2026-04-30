const State = require("../models/States.js");

const getStates = async (req, res) => {
  try {
    const states = await State.find({});
    res.status(200).json(states);
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
  getStates,
  getState,
  createState,
  updateState,
  deleteState,
};
