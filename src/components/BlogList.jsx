import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import {motion} from 'motion/react';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  return (
    <div>
        <div className='flex justify-center gap-4 sm:gap-8 my-10  relative'>
           {blogCategories.map((category)=>{
               return <div className='relative'  key={category}>
                <button onClick={()=>setMenu(category)}
                className={`cursor-pointer px-4 py-2 ${menu === category ? 'text-white bg-purple-500 ' : 'text-black bg-gray-200'} rounded-full transition-colors`}>{category}
                {menu === category && (
                  <motion.div layoutId='underline' transition={{type:'spring',stiffness:300,damping:30}}
                   className='absolute left-0 right-0 bottom-0 h-2 bg-orange-500 rounded-full'></motion.div>
                )}
                </button>
               </div>
           })}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-24  
        mx-8 sm:mx-16 xl:mx-24 '>
            {blog_data.filter((blog)=>{
                if(menu === 'All') return true;
                return blog.category === menu; 
            }).map((blog)=><BlogCard key={blog._id} blog={blog}/>)}
        </div>
    </div>
  )
}

export default BlogList