const mongoose = require("mongoose");
const placeEntity = require("../models/place");
const cmtEntity = require("../models/comment");

const Schema = mongoose.Schema;

const userSchema = new Schema(
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

userSchema.pre("remove", { query: true }, async function(next) {
  console.log("call pre remove on user delete");
  try {
    // -- delete place cascading --
    await placeEntity.deleteMany({
      _id: { $in: this.place },
    });
    // -- delete comment cascading --
    await cmtEntity.deleteMany({
      _id: { $in: this.comment },
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", userSchema);
