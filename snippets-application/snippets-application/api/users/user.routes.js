const router = require("express").Router();
const { getUserById, createUser, updateUser } = require("./user.controller");

router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;
