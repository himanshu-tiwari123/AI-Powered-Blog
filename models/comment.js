import mongoose from "mongoose";
//Generate Schema:
const commentSchema = new mongoose.Schema({
    blog:{type:mongoose.Schema.Types.ObjectId, ref:'blog',require:true},
    name:{type:String ,required:true},
    content:{type:String,required:true},
    isApproved:{type:Boolean,default:false},

},{timestamps:true});
//Create Model:
const Comment = mongoose.model('Comment',commentSchema)

export default Comment;