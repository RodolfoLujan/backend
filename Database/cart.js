const mongoose = require("mongoose") ;
const cartSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    productsId: Array(String),
});
const Cart = mongoose.model("Carrito", cartSchema);
module.exports = Cart;