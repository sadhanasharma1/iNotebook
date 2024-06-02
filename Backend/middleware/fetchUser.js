const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sadhanaisgoodgi$rl'
const fetchusers = (req,res,next)=>{
    //get the user from the jwt token and append id to 
    //req object
const token = req.header('auth-token');
if(!token){
    return res.status(401).send({error: " Please auntheticate using a valid token"})
}
try{
    const data = jwt.verify(token,JWT_SECRET);
    req.user= data.user;
    next()
}catch{
    return res.status(401).send({error: " Please auntheticate using a valid token"})
}

}
module.exports = fetchusers;