const express = require("express");
const app = express();
const port = 3000;
require("./db/db");
const cores = require("cors");



app.use(cores({
    origin:"*"
}))
const Router  = require("./routes/Router")

app.use(express.json());

app.use("/api",Router)
app.listen(port,()=>{
    console.log("server is ready ")
})
