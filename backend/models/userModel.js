const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    innovativeProds: [],
    wasteReq: [],
    userContributions: [],
    satisfiedReq: [],
    verified:{
        type:Boolean,
        default:true},
    cart: [], 
    buyCart:[],
    boughtProducts:[],
})

const User = mongoose.model("user", UserSchema)

module.exports = User;
