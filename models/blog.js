import mongoose from "mongoose";
//Generate Schema:
const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    subTitle:{type:String},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    isPublished:{type:Boolean,required:true},
    

},{timestamps:true});
//Create Model:
const Blog = mongoose.model('blog',blogSchema)

export default Blog;