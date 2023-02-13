const express = require("express")
const path = require("path")
const expressEdge = require("express-edge") 
const mongoose = require("mongoose")
const Post = require("./models/Post")
const app = express()
const fileUpload = require("express-fileupload")
const createPostValidate = require("./middleware/index")
const homePageCont = require("./controllers/homePage")
const getArticlesCont = require("./controllers/getArticles")
const getPostsCont = require("./controllers/getPosts")
const getCreatedPosts = require("./controllers/createdPost")
const createPosts = require("./controllers/createPostss")
const getAboutCont = require("./controllers/getAbout")

app.set("views", `${__dirname}/views`)

app.use(fileUpload())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(expressEdge.engine)



app.get("/",homePageCont)
app.get("/articles", getArticlesCont)
app.get("/post/:id", getPostsCont)
app.get("/posts/create", getCreatedPosts)
app.post("/posts/create", createPostValidate ,createPosts)
app.get("/about", getAboutCont)


mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://farhod:NtFq29mdbPGAJSEn@cluster0.las5s2w.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("Mongoose is connected");
})

app.listen(5000, ()=>{
    console.log("Server is running on Port: 5000");
    console.log("http://localhost:5000");
})
