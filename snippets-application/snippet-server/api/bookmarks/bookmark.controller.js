const Bookmark = require("./bookmark.model");

const createBookmark = async (req, res) => {
  const { body } = req;
  try {
    const bookmarkDoc = new Bookmark(body);
    const bookmark = await bookmarkDoc.save();
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteBookmark = async (req, res) => {
  const { params } = req;
  const id = params.id;
  try {
    const deleted = await Bookmark.deleteOne({ _id: id });
    if (deleted.deletedCount == 1) {
      res.json({ success: "removed", type: "bookmarks", id });
    } else {
      res.status(404).json({ error: `No bookmark found with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { createBookmark, deleteBookmark };
