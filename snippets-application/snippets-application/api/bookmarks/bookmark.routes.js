const router = require("express").Router();
const controller = require("./bookmark.controller");

router.post("/", controller.createBookmark);
router.delete("/:id", controller.deleteBookmark);

module.exports = router;
