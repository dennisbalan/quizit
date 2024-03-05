const jwt = require('jsonwebtoken');
//this function authenticates the JWT and acts as middleware
function authenticateToken(req,res,next){
    //Get the bearer token
    const header = req.headers['authorization'];
    //get the token from jwt
    const token = header && header.split(' ')[1]
    //if null return 401
    if(token === null){
        res.sendStatus(401);
    }
    //verify the jwt with the access_toekn_secret. If there is an err, return 403 (token expired), otherwise continue
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,id) =>{
        if(err){
            return res.statusCode(403)
        }
        req.id = id;
        next() 
    })
}
export default authenticateToken;