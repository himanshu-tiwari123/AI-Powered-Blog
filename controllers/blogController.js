import fs from 'fs'
import imagekit from '../config/imageKit.js';

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

       
    } catch (error) {
      
    }
}