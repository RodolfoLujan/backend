const express = require("express");
const { registerUser } = require("../handlers/auth-handler");
const { loginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res) => {
    let model = req.body;
    if(model.name && model.email && model.password){
        await registerUser(model);
        res.send({
            message: "Usuario registrado",
        });
    }else{
        res.status(400).json({
            error: "Por favor proporciona todos los datos, usuario, email y contraseña"
        });
    }
});

router.post("/login", async (req, res) => {
    let model = req.body;
    if(model.email && model.password){
        const result = await loginUser(model);
        if(result){
            res.send(result);
        }else{
            res.status(400).json({
                error:"Email or password is incorrect",
            });
        }
    }else{
        res.status(400).json({
            error: "Por favor proporciona el email y la contraseña"
        });
    }
});

module.exports = router;