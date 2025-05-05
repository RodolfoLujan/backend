const mongoose = require("mongoose") ;
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    isAdmin: Boolean,
});
const User = mongoose.model("Usuarios", userSchema);
module.exports = User;