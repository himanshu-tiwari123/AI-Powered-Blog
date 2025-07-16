import React, { useState, useEffect } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';

const ListBlog = () => {

  const [blogs,setBlogs ] = useState([]);

  const fetchBlogs = async()=>{
    setBlogs(blog_data);
  };

  useEffect(()=>{
    fetchBlogs();
  },[])
    
  return (
    <div className='flex-2 pt-5 px-5 md:pl-70 sm:pt-12 sm:pl-16 bg-white-300/50'>
      <h1>All Blogs</h1>
      <div className='relative h-4/8 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white-500'>
                  <table className='w-full text-sm text-gray-700 '>
                    <thead className='text-xs text-gray-700 text-left uppercase'>
                      <tr>
                        <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
                        <th scope='col' className='px-2 py-4'> Blog Title </th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden'> Date </th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden'> Status </th>
                        <th scope='col' className='px-2 py-4'> Actions </th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog,index)=>{
                         return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
                      })}
                    </tbody>
                  </table>
                </div>
    </div>
  )
}

export default ListBlog