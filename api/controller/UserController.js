import fs from "fs";
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
        let image = '';
        if (req.file) {
            image = req.file.filename;
        }
        const user = new User({ ...req.body, image });
        await user.save();
        res.status(201).json({ status: true, message: "User created successfully!" });
    }
    async update(req, res) {

    }
    async destroy(req, res) {
        let id = req.params.id;
        const user = await User.findById(id);
        if (user.image != "") {
            let image = user.image;
            let imagePath = `public/users/${image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }            
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: "User deleted successfully!" });

    }
}
export default UserController;