
const user = require("../model/user")
const jwt = require("jsonwebtoken")
const key = require("../config/private_key")
const recipe = require("../model/recipe")
const ingrediants = require("../model/ingrediant")
const Porcess_post = require("../model/process")
//token for auth 

var count = 0;
var inc = 0
const createToken = async(id)=>{
    try {
        const token = await jwt.sign({_id:id},key.name);

        return token;

    } catch (error) {
        console.log(error,"token function")
    }
}



const RegisterData = async(req,res)=>{
    try {
        const data = new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password

        });
const data_email = await  user.findOne({email:req.body.email});

if(data_email){
    res.status(400).send({message:"please try Again"})
}

else {

    const result = await data.save();
    const token =  await createToken(result._id);

    res.status(200).send({message:result,token:token});

}

    } catch (error) {
        
    }
}




const LoginData = async(req,res)=>{
    try {
       const data_email = req.body.email
       const data_password = req.body.password;
       const check_info = await user.findOne({email:data_email}) ;
       
       if(!check_info){
        res.status(400).send({message:"Please try Again "})
       }
       else {

if(check_info.password.toString() === data_password.toString()){
    const result = {
        _id : check_info._id,
        name:check_info.name,
        email:check_info.email,
        password:check_info.password
    }

    res.status(200).send(userResult)

}

else{
    res.status(400).send({message:"Invalid Entry"})

}


       }



    } catch (error) {
        res.status(400).send({message:error})
        
    }
}


const RecipePost = async (req,res)=>{
    try {
if(req.body.name != ""  || req.body.desc != "" || req.file.filename != "" || req.creator_id != ""){

const data_info = new recipe({
    name:req.body.name,
    desc:req.body.desc,
    image:req.file.filename,
    creator_id:req.creator_id

})


 await data_info.save()




}
    } catch (error) {
        res.status(400).send({message:error})
        
    }
}

const Ingredients = async(req,res)=>{
    try {
        
        const recipe_id =  await recipe.find({});
        console.log(recipe_id._id);

const ingrediant_data = new ingrediants({
    items:req.body.items,
    amount:req.body.amount,
    unit: req.body.unit,
    recipe_id:recipe_id[count]._id,

})

await ingrediant_data.save();
count++;

    } catch (error) {
        res.status(400).send({message:error})
        
    }
}



const ProcessPost = async(req,res)=>{
    try {
        
        const recipe_id =  await recipe.find({});
     

const porcess_data = new Porcess_post({
    step:req.body.step,
    recipe_id:recipe_id[inc]._id,

})

await porcess_data.save();

inc++

    } catch (error) {
        res.status(400).send({message:error})
        
    }
}




const RecipeGetData = async(req,res)=>{
    try {
       const data_recipe = await recipe.find({}) 
       console.log(data_recipe);
       res.send(data_recipe)
    } catch (error) {
        console.log(error)
    }
}

const Steps_recipe  = async(req,res)=>{
    try {
        const {recipe_id:recipe_id} = req.params
        const info = await Porcess_post.findOne({recipe_id:recipe_id});
        res.status(201).json({info})
    } catch (error) {
        res.status(400).send({message:error})
        
    }
}





module.exports = {
    RegisterData,LoginData,RecipeGetData,RecipePost,
    Ingredients,ProcessPost,Steps_recipe
}