const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = (req, res) =>{
    
    User.create(req.body ,async (err, user)=>{
        if(err){
            const registerError = Object.keys(err.errors).map(index => err.errors[index].message)
            req.flash("registerError" ,registerError)
            req.flash("data", req.body)
            return res.redirect("/reg")
        }

        const salt =  await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        user.save()
        
        res.redirect("/")
    })
}