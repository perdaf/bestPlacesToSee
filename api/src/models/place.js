var mongoose = require("mongoose");
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
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
