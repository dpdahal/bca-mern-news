import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    },
    
},{
    versionKey: false,
});
export default mongoose.model('Category', categorySchema);

