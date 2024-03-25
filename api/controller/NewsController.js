import News from "../models/News.js";
import TokenVerify from "../middleware/TokenVerify.js";

class NewsController{

    async index(req,res){

    }

    async show(req,res){
       
    }

    async store(req,res){
        let token = req.headers.authorization.split(" ")[1];
        let response = TokenVerify.verifyToken(token);
        let postedBy = response.id;
        let image = '';
        if (req.file) {
            image = req.file.filename;
        }
        const news = new News({ ...req.body, image, postedBy });
        await news.save();
        res.status(201).json({ status: true, message: "News created successfully!" });

    }

    async update(req,res){

    }

    async destroy(req,res){

    }

}

export default NewsController;