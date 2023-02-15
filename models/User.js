const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required : true,
    }
})
// pre = addEventListerner ga o'xshash 
// this = userSchema degan object ga
UserSchema.pre("save", function(next){
   const user = this 
   bcrypt.hash("user.password", 10 , function(err, hashedPassword){
    user.password = hashedPassword
    next()
   })
})

const User = mongoose.model("User", UserSchema)
module.exports = User