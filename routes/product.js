const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
} = require("../handlers/product-handler");

const { verifyToken, isAdmin } = require("../middleware/auth-middleware");

// 🟢 Rutas públicas (no requieren token)
router.get("/", async (req, res) => {
  try {
    const { search, categoryId } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // Búsqueda insensible a mayúsculas
    }

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const products = await Product.find(filter);
    res.send(products);
  } catch (err) {
    console.error("Error al obtener productos:", err.message);
    res.status(500).send({ error: "Error del servidor" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    if (!product) return res.status(404).send({ message: "Producto no encontrado" });
    res.send(product);
  } catch (err) {
    console.error("Error al obtener producto:", err.message);
    res.status(500).send({ error: "Error del servidor" });
  }
});

// 🔐 Rutas protegidas (requieren token y ser admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const model = req.body;
    const product = await addProduct(model);
    res.send(product);
  } catch (err) {
    console.error("Error al agregar producto:", err.message);
    res.status(500).send({ error: "Error del servidor" });
  }
});

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const model = req.body;
    const id = req.params.id;
    await updateProduct(id, model);
    res.send({ message: "Producto actualizado" });
  } catch (err) {
    console.error("Error al actualizar producto:", err.message);
    res.status(500).send({ error: "Error del servidor" });
  }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.send({ message: "Producto eliminado" });
  } catch (err) {
    console.error("Error al eliminar producto:", err.message);
    res.status(500).send({ error: "Error del servidor" });
  }
});

module.exports = router;
