const User = require("../models/User")

module.exports = (req, res, next)=>{
    User.findById(req.session.userId, (err, user)=>{
      if(err || !user){
        return res.redirect("/login")
      }
      next()
    })
}

//agar session yo'q bo'lsa, yokida noto'g'ri user bo'lsa , redirect qilib yubor
// noto'g'ri user = sababi user bir vaqtda  nir nechta saytga kirsa , boshqa saytda ham session bo'lishi mumkun

