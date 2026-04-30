const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funfacts: {
    type: [String],
  },
});

const State = mongoose.model("State", stateSchema);

module.exports = State;
