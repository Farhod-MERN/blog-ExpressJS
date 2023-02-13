const Post = require("../models/Post");

module.exports = async (req, res)=>{
    const posts = await Post.find().limit(5)
    console.log(posts);
    res.render("index", {posts: posts.reverse()})
}