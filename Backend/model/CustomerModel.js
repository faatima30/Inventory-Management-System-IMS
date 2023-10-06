const mongoose = require("mongoose");

const CustomerModel = mongoose.Schema({
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
  Gender: {
    type: String,
    // required: true,
    enum: ["female", "male"]
  }
}, { timestamps: true });
module.exports = mongoose.model("Customers", CustomerModel);
