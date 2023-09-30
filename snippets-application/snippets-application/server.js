const express = require("express");
const app = express();

const users = require("./api/routes/users.js");
const snippets = require("./api/routes/snippets.js");
const bookmarks = require("./api/routes/bookmarks.js");

const PORT = 8080;

app.use(express.json());

app.use("/users", users);
app.use("/snippets", snippets);
app.use("/bookmarks", bookmarks);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
