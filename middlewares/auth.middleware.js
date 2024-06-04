const jwt = require("jsonwebtoken");
const User = require("../models/User.js")

const verifyJWT = async(req, res, next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token){
            // req.user = {};
            return res.status(401).json({"message":"Unauthorized request"});
        }
            
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findOne({_id: decodedToken?._id}).select("-password -refreshToken");
    
        if (!user) return res.status(401).json({"message":"Invalid Access Token 1"})
        
        req.user = user;
    
        next(); 
    } catch (error) {
        return res.status(401).json({
            "payload": "Unauthorized",
            "message":`Invalid Access Token and error:${error}`})
    }
}


module.exports = {verifyJWT};