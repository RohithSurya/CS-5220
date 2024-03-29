const router = require("express").Router();
const controller = require("./snippet.controller");
const middleware = require("../middleware/authorization");

router.get("/", controller.getSnippets);
router.get("/:id", controller.getSnippetById);
router.post("/", middleware.verifyToken, controller.createSnippet);
router.delete("/:id", middleware.verifyToken, controller.deleteSnippetById);

router.get("/user/:id", controller.getSnippetsForUser);

module.exports = router;
