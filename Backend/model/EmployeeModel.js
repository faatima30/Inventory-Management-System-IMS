const mongoose = require("mongoose");
const EmployeeModel = new mongoose.Schema({
  Name: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  number: {
    type: Number,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    // required: true,
    enum: ["admin", "Stuff"]
  },
  Gender: {
    type: String,
    // required: true,
    enum: ["female", "male"]
  }
}, { timestamps: true });
module.exports = mongoose.model("Employees", EmployeeModel);
