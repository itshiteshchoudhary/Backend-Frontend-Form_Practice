const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const hashedPassword =await bcrypt.hash(this.password , 10)
        this.password =hashedPassword
    }
    next()
})

const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel