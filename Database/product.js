const mongoose = require("mongoose") ;
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    price: Number,
    discount:Number,
    images: Array(String),
    categoryId: {type: Schema.Types.ObjectId, ref: 'categorias'},
    brandId: {type: Schema.Types.ObjectId, ref: 'marcas'},
    isFeatured: Boolean,
    isNewProduct: Boolean,
    stock: { type: Number, required: true, default: 0 },

});
const Product = mongoose.model("productos", productSchema);
module.exports = Product;