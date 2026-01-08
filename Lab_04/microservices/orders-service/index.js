const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3002;
const SECRET_KEY = "super_tajny_klucz_api";

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./orders.db",
});

const Order = sequelize.define("order", {
  userId: { type: Sequelize.INTEGER, allowNull: false },
  bookId: { type: Sequelize.INTEGER, allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
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

app.get("/api/orders/:userId", async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.params.userId } });
  res.json(orders);
});

app.post("/api/orders", authenticateToken, async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    await axios.get(`http://localhost:3001/api/books/${bookId}`);

    const order = await Order.create({ userId, bookId, quantity });
    res.status(201).json(order);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Podana książka nie istnieje" });
    }
    res.status(500).json({ error: "Błąd komunikacji z serwisem Books" });
  }
});

app.delete("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);
  if (!order)
    return res.status(404).json({ error: "Nie znaleziono zamówienia" });
  await order.destroy();
  res.sendStatus(204);
});

app.patch("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);
  if (!order)
    return res.status(404).json({ error: "Nie znaleziono zamówienia" });

  await order.update(req.body);
  res.json(order);
});

app.listen(PORT, () => console.log(`Orders Service running on port ${PORT}`));
