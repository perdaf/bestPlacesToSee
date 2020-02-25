var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    contente: {
      type: String,
      required: true,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "place",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
