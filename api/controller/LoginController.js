
class LoginController{
   
    login(req, res){
        
        return res.json({message: 'Login successfull'});
    }

}

export default LoginController;