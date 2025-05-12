const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "productos", required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model("carritos", cartSchema);
module.exports = Cart;
