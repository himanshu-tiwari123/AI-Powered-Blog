import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import Theme from 'quill/core/theme';

const AddBlog = () => {
  const editorRef = useRef(null); 
  const quillRef = useRef(null); 


  const [image,setImage] = useState(false);
  const [title,setTitle] = useState("");
  const [subtitle,setSubtitle] = useState("");
  const [category,setCategory] = useState('Startup');
  const [isPublished,setIsPublished] = useState(false);

  const onSubmitHandler = async(e)=>{
      e.preventDefault();
  }

  const  generateContent = async()=>{
    e.preventDefault();
  }

  useEffect(()=>{
    //Initiate quill only once:
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill (editorRef.current ,{theme:'snow'});
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-white-300/50 text-gray-600 h-full md:ml-70 overflow-scroll'>
        <div className='bg-white w-full max-w-4xl p-4 md:p-10 sm:m-10 shadow rounded'>
           <p>Upload Thumbnail</p>
           <label htmlFor="image">
            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer'/>
             <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
           </label>

           <p className='mt-4'> Blog Title</p>
           <input type="text" placeholder='Type Here...' required className='w-full max-w-lg mt-2 border border-gray-300 outline-none rounded'
            onChange={(e)=>setTitle(e.target.value)} value={title} />

          <p className='mt-4'> Sub Title</p>
           <input type="text" placeholder='Type Here...' required className='w-full max-w-lg mt-2 border border-gray-300 outline-none rounded'
            onChange={(e)=>setSubtitle(e.target.value)} value={subtitle} />

          <p className='mt-4'>Blog Description</p>
          <div className='max-w-lg h-80 pb-16 sm:pb-10 pt-2 relative'> 
              <div ref={editorRef}></div>
             <button className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 
             px-4 py-1.5 rounded hover:underline cursor-pointer' type='button' onClick={generateContent}>Generate with AI</button>
          </div>

          <p className='mt-4'>Blog Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 
          border-gray-300 outline-none rounded'>
            <option value="">Select Category</option>
            {blogCategories.map((category,index)=>{
               return <option  key={index} value={category}>{category}</option>

            })}
          </select>

          <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input type="checkbox"  checked={isPublished} className='scale-125 cursor-pointer' 
            onChange={(e)=>setIsPublished(e.target.checked)}/>
          </div>

          <button type='submit' className='mt-7 w-40 h-10 bg-orange-500 text-white 
          rounded cursor-pointer'>Add Blog</button>
        </div>
    </form>

  )
}

export default AddBlog