const mongoose = require("mongoose");

const recipe = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    desc:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true
    },
    creator_id:{
        type:String,
        required:true
    }

})


const model_recipe = mongoose.model("recipe",recipe);
module.exports =model_recipe;
