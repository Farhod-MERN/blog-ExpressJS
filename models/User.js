const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [ true, "Please enter your Username"],
    },
    email: {
        type: String,
        required : [ true, "Please enter your Email"],
        unique: true,
    },
    password : {
        type: String,
        required: [ true, "Please enter your Password"],
    },
    tel: {
        type: String,
        required : [ true, "Please enter your Phone Number"],
    }
})
const User = mongoose.model("User", UserSchema)
module.exports = User