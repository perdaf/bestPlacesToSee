var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    password: String,
    place: [
      {
        type: Schema.Types.ObjectId,
        ref: "place",
      },
    ],
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
