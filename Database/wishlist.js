const mongoose = require("mongoose") ;
const wishListSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    productsId: Array(String),
});
const wishList = mongoose.model("Lista de deseos", wishListSchema);
module.exports = wishList;