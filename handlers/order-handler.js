const Order = require("../Database/order");
const Product = require("../Database/product");

async function createOrder(data) {
  const order = new Order(data);
  await order.save();

  // Descontar stock
  for (const item of data.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity }
    });
  }

  return order.toObject();
}

async function getOrdersByUser(userId) {
  return await Order.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createOrder,
  getOrdersByUser
};
