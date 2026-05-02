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

const getFunFact = async (req, res) => {
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

    // if funfact exists, return random one
    if (mongoState?.funfacts?.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * mongoState.funfacts.length,
      );
      return res
        .status(200)
        .json({ funfact: mongoState.funfacts[randomIndex] });
    }

    // otherwise no funfacts found for this state
    res
      .status(404)
      .json({ message: `No Fun Facts found for ${foundState.state}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCapital = async (req, res) => {
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
    // if found
    res
      .status(200)
      .json({ state: foundState.state, capital: foundState.capital_city });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNickname = async (req, res) => {
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
    // if found
    res
      .status(200)
      .json({ state: foundState.state, nickname: foundState.nickname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPopulation = async (req, res) => {
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
    // if found
    res.status(200).json({
      state: foundState.state,
      population: foundState.population.toLocaleString("en-US"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmission = async (req, res) => {
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
    // if found
    res
      .status(200)
      .json({ state: foundState.state, admitted: foundState.admission_date });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* POST */
const createFunFact = async (req, res) => {
  try {
    // get state code and uppercase it
    const stateCode = req.params.state.toUpperCase();

    // check for no funfacts
    if (!req.body.funfacts) {
      return res
        .status(400)
        .json({ message: "State fun facts value required" });
    }

    // check for no array
    if (!Array.isArray(req.body.funfacts)) {
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
    // get state code and uppercase it
    const stateCode = req.params.state.toUpperCase();

    // destructure the body
    const { index, funfact } = req.body;

    // validate both body properties
    if (!index) {
      return res
        .status(400)
        .json({ message: "State fun fact index value required" });
    }
    if (!funfact) {
      return res.status(400).json({ message: "State fun fact value required" });
    }

    // find the state in the json data
    const foundState = statesData.find((s) => s.code === stateCode);
    if (!foundState) {
      return res
        .status(404)
        .json({ message: "Invalid state abbreviation parameter" });
    }

    // check MongoDB for funfacts single document
    const mongoState = await State.findOne({ stateCode });
    if (!mongoState?.funfacts?.length) {
      return res
        .status(404)
        .json({ message: `No Fun Facts found for ${foundState.state}` });
    }

    // adjust the index from 1-based to 0-based
    const adjustedIndex = index - 1;
    // check if a funfact exists at that index
    if (!mongoState.funfacts[adjustedIndex]) {
      return res
        .status(404)
        .json({
          message: `No Fun Fact found at that index for ${foundState.state}`,
        });
    }

    // update using dot notation
    const updatedState = await State.findOneAndUpdate(
      { stateCode },
      { $set: { [`funfacts.${adjustedIndex}`]: funfact } },
      { returnDocument: "after" },
    );
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
const deleteFunFact = async (req, res) => {
  try {
    // get state code and uppercase it
    const stateCode = req.params.state.toUpperCase();

    // destructure the body
    const { index } = req.body;

    // validate index properties
    if (!index) {
      return res
        .status(400)
        .json({ message: "State fun fact index value required" });
    }

    // find the state in the json data
    const foundState = statesData.find((s) => s.code === stateCode);
    if (!foundState) {
      return res
        .status(404)
        .json({ message: "Invalid state abbreviation parameter" });
    }

    // check MongoDB for funfacts single document
    const mongoState = await State.findOne({ stateCode });
    if (!mongoState?.funfacts?.length) {
      return res
        .status(404)
        .json({ message: `No Fun Facts found for ${foundState.state}` });
    }

    // adjust the index from 1-based to 0-based
    const adjustedIndex = index - 1;
    // update using 2 step mongoose pattern
    await State.findOneAndUpdate(
      { stateCode },
      { $unset: { [`funfacts.${adjustedIndex}`]: 1 } },
    );
    const updatedState = await State.findOneAndUpdate(
      { stateCode },
      { $pull: { funfacts: null } },
      { returnDocument: "after" },
    );
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
