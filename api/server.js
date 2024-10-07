const express = require("express");
const app = express();
const books = require("./books");
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/api", books);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
