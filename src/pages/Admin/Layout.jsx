
import { Outlet} from 'react-router-dom'
import Sidebar from '../../components/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    
    const {axios,setToken,navigate} = useAppContext();

    const logout = ()=>{
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = null;
      setToken(null);
      navigate('/');
    }
  return (
    <>
      <div className='flex items-center justify-between py-2 h-{70px} px-4 sm:px-12 border-b border-gray-200 ml-5'>
        <div className='flex gap-4 justify-center cursor-pointer '>
            <img src="/favicon.png" alt="logo"  className='w-14 sm:w-16 cursor-pointer'
                onClick={()=>navigate('/')}/>
            <h2 className='mt-4 font-bold text-2xl text-orange-500'>BlogBuddie</h2>
        </div>
        
        <button className='text-lg px-6 py-2  font-semibold bg-orange-500 
            text-white rounded-full cursor-pointer hover:scale-105 transition-colors' onClick={logout}>Logout
        </button>
      </div>

      <div className='flex flex-col h-[calc(100vh-70px)]'>
         <Sidebar/>
         <Outlet/>
      </div>
    </>
    
  )
}

export default Layout