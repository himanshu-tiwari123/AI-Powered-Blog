
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'
import { useRef } from 'react';


const Header = () => {
    const {setInput,input} = useAppContext();
    const inputRef = useRef();

    const onSubmitHandler = async(e)=>{
       e.preventDefault();
       setInput(inputRef.current.value);
    }

    const onClear = ()=>{
        setInput('');
        inputRef.current.value = '';
    }

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-13 mb-10'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-2 
                border border-purple-500 rounded-full
                text-purple-500 font-semibold text-xl'>
                    <p>Create Blogs with our new AI feature</p>
                    <img src={assets.star_icon} alt='star-icon' className='w-4.5' />
                </div>
                <h2 className='text-5xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-purple-500'>Blogging</span> <br /> Platform</h2>
                <p className='my-3 sm:my-8 max-w-2xl m-auto max-sm:text-xs'>This is the place to show your creativity,to write what you want and showcase your blogging skills.Be it related to tech,fashion,cooking or something else...</p>
                <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded overflow-hidden shadow-lg'>
                    <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none'/>
                    <button type='submit' className='bg-purple-500 px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
                </form>
            </div>
            <div className='text-center '>{input && 
                <button onClick={onClear} className='border font-light text-sm py-1 px-3
                rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
            </div>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
        </div>
    )
}

export default Header