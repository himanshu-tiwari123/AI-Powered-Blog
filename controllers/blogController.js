import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/blog.js';

export const addBlog = async (req,res)=>{
    try {
       const {title,subTitle,description,category,isPublished} =JSON.parse(req.body.blog);
       const imageFile = req.file;

       //Check if all fields are present:
       if(!title || !description || !category || !imageFile){
        return res.json({
            success:false,
            message:"Missing required fields",
        })
       }

       //now as all fiels are available lets store them in MongoDB:

       const fileBuffer = fs.readFileSync(imageFile.path);
       const respone = await imagekit.upload({
        file:fileBuffer,
        fileName:imageFile.originalname,
        folder:"/blogs",
       });

       //optimization through imagekit URL transformation:
       const optimizedImageURL = imagekit.url({
        path:res.filePath,
        transformation:[
            {quality:'auto'}, // Auto compression
            {format : 'webp'},//Convert to modern format
            {width:'1280'} //width resizing

        ]

       })

       const image = optimizedImageURL;

       await Blog.create({title,subTitle,description,category,image,isPublished});

       res.json({
        success:true,
        message:"Blog added Successfully"
       })

       
    } catch (error) {
       res.json({
        success:false,
        message: error.message,
       })
    }
}

export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished : true})
        res.json({
            success:true,
            blogs
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const getBlogById = async(req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blog);
        if(!blog){
            return res.json({
                success:false,
                message:"Blog not found",
            })
        }

        res.send({
            success:false,
            blog,
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const deleteBlogById = async(req,res)=>{
    try {
        const {id} = req.body;
        
        await Blog.findByIdAndDelete(id);

        res.send({
            success:false,
            message:'Deleted Successfully',
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const togglePublish = async(req,res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;

        await blog.save();

        res.json({
            success:true,
            message:'Blog status updated successfully'
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const addComment = async(req,res)=>{
    try {
        const {blog,name,content} = req.body;
        await 
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}