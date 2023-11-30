const router = require("express").Router();
const controller = require("./snippet.controller");

router.get("/", controller.getSnippets);
router.get("/:id", controller.getSnippetById);
router.post("/", controller.createSnippet);
router.delete("/:id", controller.deleteSnippetById);

module.exports = router;
