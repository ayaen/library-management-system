const express = require("express");
const router = express.Router();
const db = require("./db");

// Get all books
router.get("/books", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ books: rows });
  });
});

// Add a book
router.post("/books", (req, res) => {
  const { title, author } = req.body;
  db.run("INSERT INTO books (title, author) VALUES (?, ?)", [title, author], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Delete a book
router.delete("/books/:id", (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", req.params.id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
