const mongoose = require("mongoose");

const PurchaseModel = mongoose.Schema({
  supplierID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Suppliers",
    required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
      },
  qtyPurchased: {
    type: Number,
    // required: true,
  },
  Price: {
    type: Number,
    // required: true,
  },
  datePurchased: {
    type: Date,
    // required: true,
  }
}, { timestamps: true });
module.exports = mongoose.model("Purchases", PurchaseModel);
