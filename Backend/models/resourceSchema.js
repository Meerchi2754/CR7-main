const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Expert"],
    required: true,
  },
  subcategories: {
    "YouTube Playlists": {
      type: [String],
      default: [],
    },
    Documentation: {
      type: mongoose.Schema.Types.Mixed, 
      default: {},
    },
    Roadmaps: {
      type: [String],
      default: [],
    },
    Courses: {
      type: [String],
      default: [],
    },
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
