const jwt = require("jsonwebtoken");

const secret = "bitcode";

const verifyToken = (req,res, next) =>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({message: "Token Required !"});
    }

    //Bearer token

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, secret);

        next()
    }
    catch(err){
        return res.status(401).json(
            {
                message: "Session Closed !"
            }
        )
    }
}

module.exports= verifyToken
