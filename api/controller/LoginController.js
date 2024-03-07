import User from "../models/User.js";

class LoginController{
   
    async login(req, res){
        let {email, password} = req.body;
        let findData = await User.findOne({email: email});
        if(!findData){
            return res.json({emalError: 'Invalid email'});
        }else{
            let isMatch = await findData.comparePassword(password);
            if(!isMatch){
                return res.json({passwordError: 'Invalid password'});
            }else{
                let token = findData.generateToken();
                return res.json({token: token});
            }
        }
    }

}

export default LoginController;