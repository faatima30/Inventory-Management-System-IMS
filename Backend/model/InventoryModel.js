const mongoose = require("mongoose");

const InventoryModel = mongoose.Schema({
  ProductCategory: {
    type: String,
    // required: true,
  },
  Warehouse: {
    type: String,
    // required: true,
  },
  Quantity_in_stock: {
    type: Number,
    // required: true,
  },
}, { timestamps: true });
module.exports = mongoose.model("Inventories", InventoryModel);
