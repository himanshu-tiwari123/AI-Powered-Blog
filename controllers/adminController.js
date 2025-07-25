// import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const adminLogin = async(req,res)=>{
    try {
       const {email,password} = req.body;

       if(email!=process.env.ADMIN_EMAIL || password!=process.env.ADMIN_PASSWORD){
            return res.json({
                success:false,
                message:'Invalid Credentails'
            })
        }
        const token = jwt.sign({email},process.env.JWT_SECRET_KEY);
            res.json({
                success:true,
                token:token,
            })

    } catch (error) {
       res.json({
        success:false,
        message:error.message,
       })
    }
}