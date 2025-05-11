const express = require("express");
const {
  getCommentsByProduct,
  addComment,
  deleteComment
} = require("../handlers/comment-handler");

const router = express.Router();

// Obtener comentarios de un producto
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const comments = await getCommentsByProduct(productId);
    res.send(comments);
  } catch (err) {
    res.status(500).send({ error: "Error al obtener comentarios" });
  }
});

// Crear nuevo comentario
router.post("/", async (req, res) => {
  try {
    const commentData = req.body;
    const newComment = await addComment(commentData);
    res.send(newComment);
  } catch (err) {
    res.status(400).send({ error: "No se pudo crear el comentario" });
  }
});

// Eliminar comentario por ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteComment(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Comentario no encontrado" });
    }
    res.send({ message: "Comentario eliminado" });
  } catch (err) {
    res.status(500).send({ error: "Error al eliminar el comentario" });
  }
});

module.exports = router;
