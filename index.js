const express = require("express")
const path = require("path")
// const {engine, config} = require("express-edge") yokida
const expressEdge = require("express-edge") 
const mongoose = require("mongoose")
const Post = require("./models/Post")
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(expressEdge.engine)
app.set("views", `${__dirname}/views`)

app.get("/", (req, res)=>{
    res.render("index")
})
app.get("/about", (req, res)=>{
    res.render("about")
})
app.get("/post", (req, res)=>{
    res.render("post")
})
app.get("/contact", (req, res)=>{
    res.render("contact")
})
app.get("/posts/new", (req, res)=>{
    res.render("create")
})
app.post("/posts/new", (req, res)=>{
    console.log(req.body);
    Post.create(req.body, (err, data)=>{
        err ? console.log(err) : console.log(data);
        res.redirect("/posts/new")
    })
})



mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://farhod:NtFq29mdbPGAJSEn@cluster0.las5s2w.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("Mongoose is connected");
})

app.listen(5000, ()=>{
    console.log("Server is running on Port: 5000");
    console.log("http://localhost:5000");
})
