const mongoose = require("mongoose");

const StateSchema = mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
  },

  funfacts: {
    type: String,
    required: true,
    default: 0,
  },
});

const State = mongoose.model("State", StateSchema);

module.exports = State;
