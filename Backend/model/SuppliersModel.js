const mongoose = require("mongoose");

const SuppliersModel = mongoose.Schema({
  name: {
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
}, { timestamps: true });
module.exports = mongoose.model("Suppliers", SuppliersModel);
