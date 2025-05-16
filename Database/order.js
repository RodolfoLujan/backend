const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'productos', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'pendiente' }, // pendiente, pagado, cancelado, etc.
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
