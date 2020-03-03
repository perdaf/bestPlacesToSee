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

// userSchema.pre("remove", async function(next) {
//   console.log("call pre remove on user delete");
//   // console.log("this >>", this.place);
//   next();

//   try {
//     // -- delete place cascading -^
//     await placeEntity.find({ _id: { $in: this.place } }, (err, places) => {
//       if (err) return next(err);
//       if (places) {
//         places.forEach(place => place.remove());
//       }
//     });
//     // -- delete comment cascading --
//     await cmtEntity.find({ _id: { $in: this.comment } }, (err, cmts) => {
//       if (err) return next(err);
//       if (cmts) {
//         cmts.forEach(cmt => cmt.remove());
//       }
//     });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("user", userSchema);
