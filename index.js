const express = require("express")
const path = require("path")
// const {engine, config} = require("express-edge") yokida
const expressEdge = require("express-edge") 
const mongoose = require("mongoose")
const Post = require("./models/Post")
const app = express()
const fileUpload = require("express-fileupload")

app.use(fileUpload())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(expressEdge.engine)


app.set("views", `${__dirname}/views`)

app.get("/", async (req, res)=>{
    const posts = await Post.find().limit(5)
    console.log(posts);
    res.render("index", {posts: posts.reverse()})
})

app.get("/articles", async (req, res)=>{
    const posts = await Post.find()

    res.render("articles", {
        posts: posts
    })
})

app.get("/about", (req, res)=>{
    res.render("about")
})
app.get("/post/:id", async (req, res)=>{

    const post = await Post.findById(req.params.id)

    res.render("post", {
        post: post
    })
})
app.get("/contact", (req, res)=>{
    res.render("contact")
})
app.get("/posts/create", (req, res)=>{
    res.render("create")
})
app.post("/posts/create", (req, res)=>{
     const {image} =  req.files

     image.mv(path.resolve(__dirname, "public/posts", image.name), (err)=>{
        if(err){
            console.log(err)
        }
        Post.create({...req.body, image: `posts/${image.name}`}, (err, data)=>{
            err ? console.log(err) : console.log(data);
            res.redirect("/posts/create")
        }) 
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
