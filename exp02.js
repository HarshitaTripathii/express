const express= require("express");
const app=express();

app.set("view engine", "ejs");

app.use((req, res, next)=>{
    console.log("heya , i am a middleware : app.use()")
    next();

});

app.get("/krishna", (req,res)=>{
    res.render("index1")
})
app.get("/", (req, res)=>{
    res.send("yes, this is the / page");
})

app.get("/engineer/profile/:username", (req,res)=>{
    res.send(` hello ${req.params.username} `);
})




app.listen(3000);