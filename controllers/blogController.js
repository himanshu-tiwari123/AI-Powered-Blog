import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../config/gemini.js';

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
       const uploadResponse = await imagekit.upload({
        file:fileBuffer,
        fileName:imageFile.originalname,
        folder:"/blogs",
       });

       //optimization through imagekit URL transformation:
       const optimizedImageURL = imagekit.url({
        path:uploadResponse.filePath,
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
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({
                success:false,
                message:"Blog not found",
            })
        }

        res.send({
            success:true,
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

        //We need to deleted all comments as well:

        await Comment.deleteMany({blog :id});

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
        await Comment.create({blog,name,content});
        res.json({
            success:true,
            message:'Comment added for review'
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const getBlogComments = async(req,res)=>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog:blogId, isApproved:true}).sort({createdAt:-1});

        res.json({
            success:true,
            comments,
        })
        
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt is missing",
      });
    }

    const fullPrompt = `
      Write a detailed, engaging blog post on: "${prompt}".
      - Keep the information up to date and based on recent events or trends.
      - Include a compelling title.
      - Use a professional yet friendly tone.
      - Structure it with an introduction, main content (2–3 sections), and a conclusion.
      - Format in Markdown.
      - Avoid hallucinating facts. Keep the tone professional.
    `;

    const content = await main(fullPrompt);

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
