const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = (req, res) =>{
    const {email, password} = req.body
    User.findOne({email}, async (err, user)=>{
        if(user){
            const validationPassword = await bcrypt.compare(password, user.password) 
            if(validationPassword){
                req.session.userId = user._id
                res.redirect("/")
            }else{
                res.redirect('/login')
            }
        } else{
            res.redirect("/login")
        }
    })
}
