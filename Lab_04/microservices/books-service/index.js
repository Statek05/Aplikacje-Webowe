const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 3001;
const SECRET_KEY = "super_tajny_klucz_api";

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./books.db",
});

const Book = sequelize.define("book", {
  title: { type: Sequelize.STRING, allowNull: false },
  author: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.INTEGER, allowNull: false },
});

sequelize.sync();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get("/api/books/:bookId", async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  if (!book) return res.status(404).json({ error: "Nie znaleziono książki" });
  res.json(book);
});

app.post("/api/books", authenticateToken, async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/books/:bookId", authenticateToken, async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  if (!book) return res.status(404).json({ error: "Nie znaleziono książki" });
  await book.destroy();
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Books Service running on port ${PORT}`));
