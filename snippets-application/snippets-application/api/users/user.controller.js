const User = require("./user.model");
const util = require("../util");

const getUserById = async (req, res) => {
  const { params, query } = req;
  const id = params.id;
  let user = null;
  const includeBookmarks = util.queryToBoolean(query.bookmarks);
  const includeSnippets = util.queryToBoolean(query.snippets);
  try {
    user = await User.findOne({ _id: id });
    if (user) {
      if (includeBookmarks) {
        await user.populate("bookmarks");
      }
      if (includeSnippets) {
        await user.populate("snippets");
      }
      res.json(user);
    } else {
      res.status(404).json({ error: `User by ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const createUser = async (req, res) => {
  const { body } = req;
  try {
    const userDoc = new User(body);
    const user = await userDoc.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
  const { params, body } = req;
  const id = params.id;

  try {
    delete body.created;
    const user = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `User by ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { getUserById, createUser, updateUser };
