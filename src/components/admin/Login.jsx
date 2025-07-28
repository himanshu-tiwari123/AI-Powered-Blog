import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const Login = () => {

  const {axios,setToken} = useAppContext();


  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post('/api/admin/login',{email,password});

        if(data.success ){
          setToken(data.token);
          localStorage.setItem('token',data.token);
          axios.defaults.headers.common['Authorization'] = data.token;
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-gray-400 shadow-xl shadow-gray-400 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
              <h1 className='text-3xl font-bold'><span className='text-orange-500'> Admin </span>Login</h1>
              <p className='font-light'>Enter your credentials to access <span className='text-orange-400 font-semibold text-xl'> BlogBuddie</span></p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email : </label>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} 
                  type="email" required placeholder='Enter your Email Id'
                className='border-b-2 border-gray-300 p-3 mb-6'/>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="email">Password : </label>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} 
                   type="password" required placeholder='Enter your Password'
                className='border-b-2 border-gray-300 p-3 mb-6 ml-2'/>
              </div>
               
               <button type='Submit' className='w-full border rounded-lg px-4 py-2 cursor-pointer border-gray-400 bg-orange-400 mt-3 hover:bg-purple-600 transition-all '>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login