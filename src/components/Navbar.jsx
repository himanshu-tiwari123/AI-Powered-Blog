import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center  justify-between py-5 mx-8 sm:mx-20 md:mx-24 lg:mx-32 xl:mx-40'>
      <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
        <img src="/favicon.png" alt="logo" className='w-[50px] h-[50px] cursor-pointer' />
        <h1 className='text-3xl font-bold text-orange-500'>BlogBuddie</h1>
      </div>

      <button onClick={() => navigate('/admin')} className='flex items-center text-1.5xl font-bold rounded-full cursor-pointer bg-orange-500 text-white hover:bg-orange-600-transition px-6 py-2'>Login</button>
    </div>
  )
}

export default Navbar