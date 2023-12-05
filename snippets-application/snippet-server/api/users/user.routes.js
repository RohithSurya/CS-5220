const router = require("express").Router();
const authorization = require("../middleware/authorization");
const {
  getUserById,
  loginUser,
  updateUser,
  registerUser,
} = require("./user.controller");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id", getUserById);
router.put("/:id", authorization.verifyToken, updateUser);

module.exports = router;
