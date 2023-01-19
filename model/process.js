const mongoose = require("mongoose");

const table = new mongoose.Schema({
    step:{
        type :String,
        required:true
    },
  recipe_id:{
    type:String,
    required:true
  }

})


const model_table = mongoose.model("table",table);
module.exports = model_table;
