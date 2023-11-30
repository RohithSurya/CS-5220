const express = require("express");
const app = express();
const mongo = require("./mongo");

const users = require("./api/users/user.routes.js");
const snippets = require("./api/snippets/snippet.routes.js");
const bookmarks = require("./api/bookmarks/bookmark.routes.js");

const PORT = 8080;

app.use(express.json());

app.use("/users", users);
app.use("/snippets", snippets);
app.use("/bookmarks", bookmarks);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await mongo.connectDB();
});
