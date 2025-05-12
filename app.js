const express = require("express"); 
const mongoose = require("mongoose");
const app = express();          
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer"); 
const authRoutes = require("./routes/auth"); 
const commentRoutes = require("./routes/comment");
const cartRoutes = require("./routes/cart");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.use(cors());
app.use(express.json());           
app.get("/", (req, res) => {
    res.send("Servidor corriendo");
});
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/product", productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);
app.use("/comment", commentRoutes);
app.use("/cart", cartRoutes);



async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "ProyectoFInal",
    });
    console.log("Conexión con Mongo exitosa");
}

connectDb().catch((err) => {
    console.error(err);
});

app.listen(port, () => {
    console.log("El servidor está corriendo en el puerto", port);
});
