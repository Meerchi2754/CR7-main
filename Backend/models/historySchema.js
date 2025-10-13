const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);
const History = mongoose.model("History", historySchema);

module.exports = History;
