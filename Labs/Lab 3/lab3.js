// This file should run with: node lab3.js
const mongoose = require("mongoose");

// MOCK DATA
const bookmarks = require("./mock_database/bookmarks.json");
const users = require("./mock_database/users.json");
const snippets = require("./mock_database/snippets.json");

// MODELS
const Bookmark = require("./models/bookmarks");
const Snippet = require("./models/snippets");
const User = require("./models/users");

// BUILD THE MONGO URI CONNECTION STRING
const { username, password, projectname } = require("./config.json");
// const mongoUrl = `mongodb+srv://prsurya1020:1234@cluster0.g9wbkot.mongodb.net/?retryWrites=true&w=majority`;
const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.g9wbkot.mongodb.net/?retryWrites=true&w=majority`;

// CONNECT TO MONGO DB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();
// HELPER FUNCTION TO FIND MATCH BASED ON idx
const _findMatch = (resource, identifier) => {
  return resource
    .filter((item) => {
      if (identifier instanceof Array) {
        return identifier.includes(item.idx);
      }

      if (typeof identifier === "number") {
        return identifier === item.idx;
      }
    })
    .map((item) => item.mongo_id);
};

// SCRIPT TO CLEAN, INSERT AND QUERY
const execScript = async () => {
  // clean any existing data in our database
  // iterate and insert users
  // iterate and insert snippets
  // iterate and insert bookmarks
  // query to get a user with snippets and bookmarks
  // query to get a snippet with bookmarks
  // close the connection to mongo db
  await User.deleteMany({});
  await Snippet.deleteMany({});
  await Bookmark.deleteMany({});
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userdoc = new User(user);
    try {
      const saved = await userdoc.save();
      user.mongo_id = saved._id;
      console.log(saved);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  for (let i = 0; i < snippets.length; i++) {
    const snippet = snippets[i];
    const userMatch = _findMatch(users, snippet.user_id);
    const snippetdoc = new Snippet({
      ...snippet,
      user_id: userMatch,
    });
    try {
      const saved = await snippetdoc.save();
      snippet.mongo_id = saved._id;
      console.log(saved);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];
    const userMatch = _findMatch(users, bookmark.user_id);
    const snippetMatch = _findMatch(snippets, bookmark.snippet_id);
    const bookmarkDoc = new Bookmark({
      ...bookmark,
      snippet_id: snippetMatch,
      user_id: userMatch,
    });
    try {
      const saved = await bookmarkDoc.save();
      console.log(saved);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  const userWithSnippetsAndBookmarks = await User.findOne({
    _id: users[0].mongo_id,
  })
    .populate("snippets")
    .populate("bookmarks");
  console.log(userWithSnippetsAndBookmarks);
  const snippetWithBookmarks = await Snippet.findOne({
    _id: snippets[0].mongo_id,
  }).populate("bookmarks");
  console.log(snippetWithBookmarks);
  mongoose.connection.close();
};
execScript();
