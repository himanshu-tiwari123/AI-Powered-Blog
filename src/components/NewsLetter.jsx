import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
        <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog</h1>
        <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get your latest blogs as well as exclusive news for free</p>
        <form  className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input className='border border-gray-400 rounded-md h-full w-full rounded-r-md px-2 text-gray-500' type="text"
             placeholder='Enter your email id' required/>
            <button type='submit' className='md:px-12 px-6 mx-4 h-full text-white bg-purple-500 hover:bg-orange-600 cursor-pointer rounded-full'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter