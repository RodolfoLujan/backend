const express = require("express");
const { createOrder, getOrdersByUser } = require("../handlers/order-handler");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.send(order);
  } catch (err) {
    console.error("Error al crear pedido:", err.message);
    res.status(500).send({ error: "No se pudo crear el pedido" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.params.userId);
    res.send(orders);
  } catch (err) {
    console.error("Error al obtener pedidos:", err.message);
    res.status(500).send({ error: "No se pudieron obtener los pedidos" });
  }
});

module.exports = router;
