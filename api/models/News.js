import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
    },
    summary: {
        type: String,
    },
    description:{
        type: String,
    },
    page_views:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
},{
    versionKey: false
});

export default mongoose.model('News', newsSchema);