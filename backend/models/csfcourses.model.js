const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: false,
    },
    field: {
      type: String,
      required: true,
      trim: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;
