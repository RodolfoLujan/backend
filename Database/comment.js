const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'productos', required: true },
  userName: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("comentarios", commentSchema);
module.exports = Comment;
