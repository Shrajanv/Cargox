const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
      default: "company.jpg", // Replace with your default image URL
    },
    location: {
      type: String,
      require: true,
    },
    licenseNumber: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("company", companySchema);
