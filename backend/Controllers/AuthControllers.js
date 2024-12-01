const UserModel = require("../Models/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(401)
                .json({ message: " user is already exist ", success: false })
        }
        const newUser =await UserModel.create({ name, email, password })
        return res.status(201)
            .json({
                message: "signup successfully",
                success: true
            })
    } catch (error) {
        return res.status(401)
            .json({
                message: "error happend during signup",
                success: true
            })
    }
}


const login = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(401)
                .json({ message: " user is already exist ", success: false })
        }
        const isPasswordRight = await bcrypt.compare(password , user.password)
        if(!isPasswordRight){
            return res.status(403)
            .json({
                message : "enter correct password",
                success : false
            })
        }
        const jwtToken = jwt.sign(
            {email :user.email , _id :user._id},
            process.env.Jwt_Secret,
            {expiresIn : "24h"}
        )

        return res.status(201)
            .json({
                message: "signup successfully",
                success: true,
                jwtToken,
                email,
                name : user.name
            })
    } catch (error) {
        return res.status(401)
            .json({
                message: "error happend during signup",
                success: true
            })
    }
}

// const login = async (req, res) => {
//     try {
//         const user = await UserModel.findOne({ email: req.body.email })
//         if (!user) return res.status(403).json({ message: "user not fount", success: false })

//         const isPasswordRight = await bcrypt.compare(req.body.password, user.password)
//         if (!isPasswordRight) { return res.status(404).json({ message: "Password is wrong", success: false }) }

//         const jwtToken = jwt.sign(
//             { email: user.email, _id: user._id },
//             process.env.Jwt_Secret,
//             { expiresIn: "24h" }
//         )
//         return res.status(205)
//         .json({ 
//             message: "login successful",
//             success: true,
//             jwtToken,
//             email : req.body.email,
//             name : user.name
//         })

//     } catch (error) {
//         return res.status(500)
//             .json({
//                 message: "login fail enter correct details",
//                 success: false
//             })
//     }
// }

module.exports = { signup, login }