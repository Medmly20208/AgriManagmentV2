const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: false,
    },
    secondname: {
      type: String,
      required: true,
      trim: false,
    },
    field: {
      type: String,
      required: true,
      trim: false,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: false,
    },
    email: {
      type: String,
      required: true,
      trim: false,
    },
    adress: {
      type: String,
      required: true,
      trim: false,
    },
    city: {
      type: String,
      required: true,
      trim: false,
    },
    coursedocument: {
      type: String,
      required: false,
      trim: false,
    },
    cv: {
      type: String,
      required: false,
      trim: false,
    },
  },
  {
    timestamps: true,
  }
);

const Instructorcsf = mongoose.model("Instructors", instructorSchema);

module.exports = Instructorcsf;
