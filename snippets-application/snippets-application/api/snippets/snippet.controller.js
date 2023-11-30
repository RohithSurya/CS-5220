const Snippet = require("./snippet.model");

const getSnippets = async (req, res) => {
  const { query } = req;
  const { language: programmingLanguage } = query;
  let filter = {};
  if (programmingLanguage) {
    filter = {
      programming_language: { $regex: programmingLanguage, $options: "i" },
    };
  }
  try {
    const snippets = await Snippet.find(filter);
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getSnippetById = async (req, res) => {
  const { params, query } = req;
  const id = params.id;
  const { includes } = query;
  try {
    const snippet = await Snippet.findOne({ _id: id });
    if (snippet) {
      if (includes === "bookmark_count") {
        await snippet.populate("bookmark_count");
      }
      if (includes === "bookmarks") {
        await snippet.populate("bookmarks");
      }
      res.json(snippet);
    } else {
      res.status(404).json({ error: `No snippet found with id: ${id}` });
    }
  } catch (error) {
    res.json({ error: error.toString() });
  }
};

const createSnippet = async (req, res) => {
  const { body } = req;
  delete body.created;
  try {
    const snippetDoc = new Snippet(body);
    const snippet = await snippetDoc.save();
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteSnippetById = async (req, res) => {
  const { params } = req;
  const id = params.id;
  try {
    const snippet = await Snippet.findOneAndDelete({ _id: id });
    if (snippet) {
      res.json({ success: "removed", type: "snippets", id });
    } else {
      res.status(404).json({ error: `No snippet found with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  getSnippets,
  getSnippetById,
  createSnippet,
  deleteSnippetById,
};
