const Post = require("../models/Post")

module.exports = async (req, res)=>{
    const posts = await Post.find()

    res.render("articles", {
        posts: posts
    })
}