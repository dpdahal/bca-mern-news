import User from "../models/User.js";

class UserController{

   async index(req,res){
        const users = await User.find({});
       return res.status(200).json(users);
    }
    async show(req,res){
        res.send('Hello user with id: '+req.params.id);
    }
    async store(req,res){
        const user = new User({...req.body});
        await user.save();
        res.status(201).json(user);
    }
    async update(req,res){
       
    }
    async destroy(req,res){
       
    }
}
export default UserController;