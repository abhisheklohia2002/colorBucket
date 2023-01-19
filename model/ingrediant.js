const mongoose = require("mongoose");

const ingrediant = new mongoose.Schema({
    items:{
        type :String,
        required:true
    },
    amount:{
        type:Number,
        required:true,

    },
    unit:{
        type:String,
        required:true
    },
    recipe_id:{
        type :String,
        required:true
    }

})


const model_ingrediant = mongoose.model("ingrediant",ingrediant);
module.exports = model_ingrediant;
