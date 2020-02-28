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

userSchema.pre("remove", { query: true }, async function() {
  console.log("call pre remove on user delete");
  const placeToRemove = mongoose.model("place");
  await placeToRemove.remove({ _id: { $in: this.place } }).exec();
});

module.exports = mongoose.model("user", userSchema);
