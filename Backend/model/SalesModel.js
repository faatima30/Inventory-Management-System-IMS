const mongoose = require("mongoose");

const SalesModel = mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
      },
  qtySold: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  dateSold: {
    type: Date,
    // required: true,
  }
}, { timestamps: true });
module.exports = mongoose.model("Sales", SalesModel);
