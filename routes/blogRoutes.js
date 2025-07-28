import express from 'express'
import multer from 'multer';

import { addBlog, deleteBlogById, getAllBlogs, getBlogById, togglePublish } from '../controllers/blogController.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image'),auth,addBlog);
blogRouter.get('/all',getAllBlogs);
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/delete',auth,deleteBlogById);
blogRouter.post('/toggle-publish',auth,togglePublish);

export default blogRouter;