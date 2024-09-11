const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    title: {
      type: String,
      require: true,
    },
    charge: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      require: true,
    },
    description: {
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
module.exports = mongoose.model("service", serviceSchema);
