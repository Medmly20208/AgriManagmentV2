const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionsSchema = new Schema(
  {
    clientid: {
      type: String,
      required: false,
    },
    instructorid: {
      type: String,
      required: false,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },
    instructorname: {
      type: String,
      required: true,
      trim: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Sessions", sessionsSchema);

module.exports = Session;
