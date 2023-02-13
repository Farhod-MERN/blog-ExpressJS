const createPostValidate = (req, res, next)=>{
    if(!(req.files && req.files.image) || !req.body.title || req.body.content || !req.body.description || !req.body.username){
        console.log("Create Post Middle  Error !!!");
        res.redirect("/")
    }
    next()
}

module.exports = createPostValidate