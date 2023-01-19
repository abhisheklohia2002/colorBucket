const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.static("public"));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,path.join(__dirname,"../public/foodimage"),(error,res)=>{
    if(error)throw error
})
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+"-"+file.originalname;
        cb(null,name)
    }
})


const upload = multer({storage:storage});




//api
const auth = require("../middleware/Auth")
const Controller = require("../controller/Controller")

router.post("/register",Controller.RegisterData)
router.post('/login',auth,Controller.LoginData)
router.post("/post/recipe",upload.single("image"),Controller.RecipePost)
router.post("/post/ingredients",Controller.Ingredients);
router.post("/post/process",Controller.ProcessPost)



router.get("/get/recipe",Controller.RecipeGetData)
router.get("/post/process/:id",Controller.Steps_recipe)

module.exports = router;
