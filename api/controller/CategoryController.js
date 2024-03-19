import Category from "../models/Category.js";

class CategoryController{
    async index(req,res){
        const catData = await Category.find({});
        res.json(catData);
    }
    async show(req,res){
        let id = req.params.id;
        const catData = await Category.findById(id);
        res.json(catData);
    }
    async store(req,res){
        const catData = new Category({...req.body});
        await catData.save();
        res.json({status: 201, message: "Saved successfully"});
    }
    async update(req,res){
        let id = req.params.id;
        await Category.findByIdAndUpdate(id, {...req.body});
        res.json({status: 201, message: "Updated successfully"});
    }
    async destroy(req,res){
        let id = req.params.id;
        await Category.findByIdAndDelete(id);
        res.json({status: 200, message: "Deleted successfully"});
    }
}
export default CategoryController