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

userSchema.pre("deleteOne", { query: true }, async function(next) {
  console.log("call pre remove on user delete");
  console.log("this place>>>", this.place);
  console.log("this comment >>>", this.comment);

  // try {
  //   // -- delete place cascading --
  //   await placeEntity.deleteMany({
  //     _id: { $in: this.place },
  //   });
  // } catch (error) {
  //   next(error);
  // }
  try {
    // -- delete comment cascading --
    await cmtEntity.deleteMany({ _id: { $in: this.comment } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", userSchema);
