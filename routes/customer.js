const express = require("express");
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const router = express.Router();

router.get("/nuevos-productos", async (req, res) => { 
    const products = await getNewProducts();
    res.send(products);
});

router.get("/productos-destacados", async (req, res) => {  
    const products = await getFeaturedProducts();
    res.send(products);
});

router.get("/categorias", async (req, res) => {  
    const categories = await getCategories();
    res.send(categories);
});
module.exports = router;
