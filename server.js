const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin : "*",
    methods : ["GET","POST","PUT","PATCH","DELETE"]
}))

app.get("/",(req,res)=>{
    res.status(200).json({success:true,message:"Hello World 14000"})
})

app.listen(4000,()=>{
    console.log("Listening on port 4000");
})