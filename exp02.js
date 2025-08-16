const express= require("express");
const app=express();

app.get("/", (req, res)=>{
    res.send("yes, this is the / page");
})

app.get("/engineer/profile/:username", (req,res)=>{
    res.send(` hello ${req.params.username} `);
})

app.use((req, res, next)=>{
    console.log("heya , i am a middleware : app.use()")
    next();

});


app.listen(3000);