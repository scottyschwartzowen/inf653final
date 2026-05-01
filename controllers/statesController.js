const State = require("../models/State.js");
const statesData = require("../statesData.json");

/* GET */
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

    // check contig query param (using req.query) = true
    if (req.query.contig === "true") {
      const contiguous = merged.filter(
        (state) => state.code !== "AK" && state.code !== "HI",
      );
      return res.status(200).json(contiguous);
    }

    // check noncontig query param (using req.query) = false
    if (req.query.contig === "false") {
      const noncontiguous = merged.filter(
        (state) => state.code === "AK" || state.code === "HI",
      );
      return res.status(200).json(noncontiguous);
    }

    res.status(200).json(merged);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getState = async (req, res) => {
  try {
    // get state code and uppercase it
    const stateCode = req.params.state.toUpperCase();

    // find the state in the json data
    const foundState = statesData.find((s) => s.code === stateCode);

    // if not found
    if (!foundState) {
      return res
        .status(404)
        .json({ message: "Invalid state abbreviation parameter" });
    }

    // check MongoDB for funfacts to find single document
    const mongoState = await State.findOne({ stateCode: stateCode });

    // if yes, merge and return
    if (mongoState?.funfacts?.length > 0) {
      return res
        .status(200)
        .json({ ...foundState, funfacts: mongoState.funfacts });
    }

    // otherwise return JSON data without funfacts
    res.status(200).json(foundState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* POST */
const createFunFact = async (req, res) => {
  try {
    // get state code and uppercase it
    const stateCode = req.params.state.toUpperCase();

    // check for no funfacts or no array
    if (!req.body.funfacts || !Array.isArray(req.body.funfacts)) {
      return res
        .status(400)
        .json({ message: "State fun facts value must be an array" });
    }

    // add funfacts to MongoDB
    const updatedState = await State.findOneAndUpdate(
      { stateCode: stateCode },
      { $push: { funfacts: { $each: req.body.funfacts } } },
      { returnDocument: "after", upsert: true },
    );

    // return updated state
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* PATCH */
const updateFunFact = async (req, res) => {
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

const deleteFunFact = async (req, res) => {
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
  createFunFact,
  updateFunFact,
  deleteFunFact,
};
