const jwt = require("jsonwebtoken")

const ensureAuthonticated = (req,res,next)=>{
    const auth = req.headers['authorization']
    // console.log("Authorization header:", auth)
    if(!auth){
        return res.status(407)
        .json({message :"unauthorized , JWT token is required"})
    }
    try {
        const decoded = jwt.verify(auth , process.env.Jwt_Secret)
        // console.log("Decoded token:", decoded);
        req.user = decoded
        next()
    } catch (error) {
        // console.error("JWT verification error:", error.message);
        return res.status(409)
        .json({message :"unauthorized , jwt token is worng or expired" })
    }
}

module.exports = ensureAuthonticated