const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    picture: {
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
module.exports = mongoose.model("category", categorySchema);
