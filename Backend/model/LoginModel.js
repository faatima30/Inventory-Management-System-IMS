const mongoose = require("mongoose");

const LoginModel = mongoose.Schema(
  {
    EmployeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("login", LoginModel);
