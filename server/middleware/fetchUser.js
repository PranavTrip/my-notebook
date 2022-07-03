const jwt = require("jsonwebtoken");
const JWT_SECRET = "PranavIs@GoodB$oy";

const fetchUser = async (req, res, next) => {
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({error:'Please authenticate using a valid token'});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        console.log(error);
        res.send({error: "Some error occured"});
    }
   
};

module.exports = fetchUser;
