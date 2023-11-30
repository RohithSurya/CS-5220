const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
    },
    years_experience: Number,
    programming_languages: [String],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual("snippets", {
  ref: "Snippet",
  localField: "_id",
  foreignField: "user_id",
});

UserSchema.virtual("bookmarks", {
  ref: "Bookmark",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
