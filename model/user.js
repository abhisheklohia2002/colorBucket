const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    }

})


const model_user = mongoose.model("user",user);
module.exports = model_user;
