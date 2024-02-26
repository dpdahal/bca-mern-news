import User from "../models/User.js";

class UserController {

    async index(req, res) {
        const users = await User.find({});
        return res.status(200).json(users);
    }
    async show(req, res) {
       let id = req.params.id;
       const user = await User.findById(id);
       return res.status(200).json(user);
    }
    async store(req, res) {
        let image='';
        if(req.file){
            image = req.file.filename;
        }
        const user = new User({ ...req.body, image});
        await user.save();
        res.status(201).json(user);
    }
    async update(req, res) {

    }
    async destroy(req, res) {

    }
}
export default UserController;