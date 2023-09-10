const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employee = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  designation: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: Number, //0-male, 1-female
    enum: [0, 1],
    default: 0,
  },
  joiningDate: {
    type: Date,
  },
  typeId: {
    type: Number,
    enum: [0, 1], //0-Full time,  1-trainee
    default: 0,
  },
  stateId: {
    type: Number,
    enum: [0, 1, 2], // 0- new , 1-active, 2-inactive
    default: 0,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"auth"
  }
});

module.exports = mongoose.model("employee", employee);
