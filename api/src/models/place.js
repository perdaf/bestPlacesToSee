const mongoose = require("mongoose");
const helpers = require("../controllers/helpers");
// const path = require("path");

var Schema = mongoose.Schema;

var placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
      required: true,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

placeSchema.pre("remove", async function(next) {
  console.log("Call to place pre function >>>");
  // helpers.deleteImage(this.image);
  next();
});

module.exports = mongoose.model("place", placeSchema);
