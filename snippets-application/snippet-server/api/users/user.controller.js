const User = require("./user.model");
const util = require("../util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");

const getUserById = async (req, res) => {
  const { params, query } = req;
  const id = params.id;
  let user = null;
  const includeBookmarks = util.queryToBoolean(query.bookmarks);
  const includeSnippets = util.queryToBoolean(query.snippets);
  try {
    const virtuals = [];
    if (includeBookmarks) {
      virtuals.push("bookmarks");
    }
    if (includeSnippets) {
      virtuals.push("snippets");
    }
    user = await User.findOne({ _id: id })
      .select("-password")
      .populate(virtuals);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `User by ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const registerUser = async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  if (!username || !password)
    return res.status(400).json("username and password are required");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const userDoc = new User({ ...body, password: hashed });
    const saved = await userDoc.save();
    const user = saved.toObject();
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const loginUser = async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  // console.log(username, password);
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    console.log(user);
    if (!user) res.status(401).json({ error: "Invalid credentials" });
    const authenticated = await bcrypt.compare(password, user.password);
    if (authenticated) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        config.jwtsecret,
        { expiresIn: "24h" }
      );
      const authorized = user.toObject();
      delete authorized.password;
      res.header("Authorization", `Bearer ${token}`).json(authorized);
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
  const { params, body } = req;
  const id = params.id;

  try {
    delete body.created;
    const updated = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (updated) {
      const user = updated.toObject();
      delete user.password;
      res.json(user);
    } else {
      res.status(404).json({ error: `User by ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { getUserById, registerUser, updateUser, loginUser };
