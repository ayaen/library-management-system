const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Create books table
db.serialize(() => {
  db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author TEXT)");
  db.run("INSERT INTO books (title, author) VALUES ('1984', 'George Orwell')");
  db.run("INSERT INTO books (title, author) VALUES ('To Kill a Mockingbird', 'Harper Lee')");
});

module.exports = db;
