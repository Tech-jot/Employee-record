const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const auth = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  contact: {
    type: String,
  },

  password: {
    type: String,
  },

  stateId: {
    type: Number,
    enum: [0, 1, 2], // 0- new , 1-active, 2-inactive
    default: 0,
  },

  typeId: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },

 
});
module.exports = mongoose.model("auth", auth);
