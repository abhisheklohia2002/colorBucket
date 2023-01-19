const jwt = require("jsonwebtoken");
const key = require("../config/private_key")




const Auth = async(req,res,next)=>{
    try {
       const token_verify = req.body.token  || req.query.token || req.headers['authorization'];
       if(token_verify){
        const data_token = await jwt.verify(token_verify,key.name);
        if(data_token){
            res.status(200).send({message:"verify Token"})
        }
        else {
            res.status(400).send({message:"invalid token"})
        }
       }
    } catch (error) {
        res.status(400).send({message:"auth Error"})
    }


    return next();
    
}


module.exports = Auth;
