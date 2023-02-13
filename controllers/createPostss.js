const Post = require("../models/Post")

module.exports = (req, res)=>{
    const {image} =  req.files

    image.mv(path.resolve(__dirname, ".." ,"public/posts", image.name), (err)=>{
       if(err){
           console.log(err)
       }
       Post.create({...req.body, image: `posts/${image.name}` }, (err, data)=>{
           err ? console.log(err) : console.log(data);
           res.redirect("/posts/create")
       }) 
    })
}