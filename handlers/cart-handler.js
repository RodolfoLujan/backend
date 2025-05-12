const Cart = require("../Database/cart");

// Obtener carrito por usuario
async function getCartByUser(userId) {
  return await Cart.findOne({ userId }).populate("items.productId");
}

// Agregar o actualizar producto en el carrito
async function addToCart(userId, productId, price, quantity = 1) {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // Crear nuevo carrito si no existe
    cart = new Cart({
      userId,
      items: [{ productId, price, quantity }],
    });
  } else {
    // Revisar si el producto ya está en el carrito
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex > -1) {
      // Ya existe: actualiza cantidad
      cart.items[itemIndex].quantity += quantity;
    } else {
      // No existe: agrega nuevo
      cart.items.push({ productId, price, quantity });
    }
  }

  cart.updatedAt = new Date();
  await cart.save();
  return await cart.populate("items.productId");
}

// Actualizar cantidad
async function updateItemQuantity(userId, productId, quantity) {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new Error("Carrito no encontrado");

  const item = cart.items.find((i) => i.productId.equals(productId));
  if (!item) throw new Error("Producto no encontrado en carrito");

  item.quantity = quantity;
  cart.updatedAt = new Date();

  await cart.save();
  return await cart.populate("items.productId");
}

// Eliminar producto del carrito
async function removeItemFromCart(userId, productId) {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Carrito no encontrado");

  cart.items = cart.items.filter((item) => !item.productId.equals(productId));
  cart.updatedAt = new Date();

  await cart.save();
  return await cart.populate("items.productId");
}

// Vaciar carrito
async function clearCart(userId) {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Carrito no encontrado");

  cart.items = [];
  cart.updatedAt = new Date();

  await cart.save();
  return cart;
}

module.exports = {
  getCartByUser,
  addToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
};
