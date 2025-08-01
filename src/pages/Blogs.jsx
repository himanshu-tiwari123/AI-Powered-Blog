import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blogs = () => {
  const {id} = useParams();
  const {axios} = useAppContext();

  const [data,setData] = useState(null);
  const [comments,setComments] = useState([]);

  const [name,setName] = useState('');
  const [content,setContent] = useState('');
  

  const addComment = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`/api/blog/add-comment`,{blog:id, name,content});

      if(data.success){
        toast.success(data.message);
        setName('');
        setContent('');
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchComments = async()=>{
    try {
      const {data} = await axios.post(`/api/blog/comments`,{blogId:id})
      if(data.success){
        setComments(data.comments);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchBlogData = async()=>{
    try{
      const {data} = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    }
    catch(error){
      toast.error(error.message);
    }
  }
  useEffect(()=>{
     fetchBlogData();
     fetchComments();
  },[id])

  return  data ? (
    
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute inset-0 w-full h-full object-cover -z-11 opacity-50' />
      <Navbar></Navbar>
      <div className='text-center mt-20 text-gray-600'>
         <p className='text-primary py-4 font-medium'>Publised on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
         <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
         <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
         <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-purple-500 font-medium text-white'>Himanshu Tiwari</p>
       </div>

       <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt=""  className='rounded-3xl mb-5'/>
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html : data.description}}>

        </div>
        {/* Comments Section */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4 text-xl text-underline'>Comments ({comments.length}):</p>
            <div className='flex flex-col gap-4'>
                {comments.map((item,index)=>(
                    <div key={index} className='relative bg-gray-700 border border-gray-300 max-w-xl p-4 rounded text-gray-600'>
                      <div className='flex items-center gap-2 mb-2'>
                        <img src={assets.user_icon} alt="" className='w-6 text-white' />
                        <p className='font-medium text-white'>{item.name}</p>
                      </div>
                      <p className='text-sm max-w-md ml-8 text-white'>{item.content}</p>
                      <div className='absolute right-4 bottom-3 flex items-center gap-2 text-x5 text-white'>{Moment(item.createdAt).fromNow()}</div>
                    </div>
                ))}
            </div>
        </div>
          {/* Add comment section */}
          <div  className='max-w-3xl mx-auto '>
            <p className='font-semibold mb-4 text-xl'>Add your Comment :</p>
            <form  onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded '/>
              <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Type your Comment...' className='w-full p-2 border border-gray-300 rounded  h-50'></textarea>
              <button type='submit' className='border border-gray-300 rounded-md px-5 py-2 bg-purple-500 cursor-pointer hover:scale-105'>Submit</button>
            </form>
            
          </div>
       </div>
      <Footer/>
    </div>
  ) : <Loader/>
}

export default Blogs