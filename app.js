const express = require("express"); 
const mongoose = require("mongoose");
const app = express();          
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");

app.use(cors());
app.use(express.json());           
app.get("/", (req, res) => {
    res.send("Servidor corriendo");
});
app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);

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
    console.log("El servidor está corriendo en puerto", port);
});
