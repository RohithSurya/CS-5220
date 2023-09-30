const router = require("express").Router();

const snippets = require("../../../mock-database/snippets.json");

router.get("/", (req, res) => {
  const { query } = req;
  const { language: programmingLanguage } = query;
  let result = snippets;
  if (programmingLanguage) {
    result = snippets.filter(
      (snippet) =>
        snippet.programming_language.toLowerCase() ===
        programmingLanguage.toLocaleLowerCase()
    );
  }
  res.json(result);
});

router.post("/", (req, res) => {
  const { body } = req;
  const ids = snippets.map((snippet) => snippet.id);
  const id = Math.max(...ids) + 1;
  const created = new Date().toJSON();
  const snippet = { ...body, id, created };
  snippets.push(snippet);
  res.json(snippet);
});

module.exports = router;
