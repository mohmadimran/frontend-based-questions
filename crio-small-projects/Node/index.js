const express = require("express")



const app = express();

app.get("/",(req,res)=>{
    // console.log(" get the data of user")
    res.json({user:"imran"
    })
})

app.get("/product",(req,res)=>{

    // const {id} = req.params;

    // console.log("this is params id", id)
    // res.json({id:"1",product:"bag",color:"black"})

    // res.send(id)

    const {name,price} = req.query
    res.send({productName:name,productPrice:price})
})

const PORT = 3000; 
app.listen(PORT,()=>{
    console.log(`app is runing on port ${PORT}`)
})