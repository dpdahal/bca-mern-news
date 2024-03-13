import TokenVerify from "./TokenVerify.js";

class RouteMiddleware {
    check(req,res,next){
        if(!req.headers.authorization){
            return res.json({status: false,message: 'Token not found'});
        }
        let token = req.headers.authorization.split(" ")[1];
        let response = TokenVerify.verifyToken(token);
        if(response){
            next();
        }else{
            return res.json({status: false,message: 'Invalid token'});
        }
    }   
}

export default RouteMiddleware;