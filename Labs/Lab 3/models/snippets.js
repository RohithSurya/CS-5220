const mongoose = require("mongoose");
const SnippetSchema = new mongoose.Schema(
  {
    title: String,
    code_snippet: String,
    programming_language: String,
    created: {
      type: Date,
      default: Date.now,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

SnippetSchema.virtual("bookmarks", {
  ref: "Bookmark",
  localField: "_id",
  foreignField: "snippet_id",
});

const Snippet = mongoose.model("Snippet", SnippetSchema);

module.exports = Snippet;
