const express = require("express");
const {
  getCartByUser,
  addToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = require("../handlers/cart-handler");

const router = express.Router();

// GET /cart/:userId → obtener carrito de usuario
router.get("/:userId", async (req, res) => {
  try {
    const cart = await getCartByUser(req.params.userId);
    res.send(cart || { items: [] });
  } catch (err) {
    res.status(500).send({ error: "Error al obtener el carrito" });
  }
});

// POST /cart → agregar producto al carrito
router.post("/", async (req, res) => {
  try {
    const { userId, productId, price, quantity } = req.body;
    const cart = await addToCart(userId, productId, price, quantity);
    res.send(cart);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// PUT /cart/:userId/:productId → actualizar cantidad de un producto
router.put("/:userId/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await updateItemQuantity(req.params.userId, req.params.productId, quantity);
    res.send(cart);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// DELETE /cart/:userId/:productId → eliminar producto del carrito
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const cart = await removeItemFromCart(req.params.userId, req.params.productId);
    res.send(cart);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// DELETE /cart/:userId → vaciar carrito completo
router.delete("/:userId", async (req, res) => {
  try {
    const cart = await clearCart(req.params.userId);
    res.send(cart);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
