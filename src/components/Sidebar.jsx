
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className="fixed h-full w-64 bg-gray-500 text-white"> {/* Sidebar container */}
      <div className="p-4">
        <NavLink end={true} to='/admin' 
          className={({isActive}) => `
            flex items-center gap-3 py-3 px-4 rounded-lg 
            hover:bg-orange-700 transition-colors
            ${isActive ? "bg-gray-600" : ""}
          `}
        > 
          <img src={assets.home_icon} alt="" className='w-5' />
          <p>Dashboard</p>
        </NavLink>

        <NavLink  to='/admin/addBlog' 
          className={({isActive}) => `
            flex items-center gap-3 py-3 px-4 rounded-lg 
            hover:bg-orange-700 transition-colors
            ${isActive ? "bg-gray-600" : ""}
          `}
        > 
          <img src={assets.add_icon} alt="" className='w-5' />
          <p>Add Blog</p>
        </NavLink>

        <NavLink  to='/admin/listBlog' 
          className={({isActive}) => `
            flex items-center gap-3 py-3 px-4 rounded-lg 
            hover:bg-orange-700 transition-colors
            ${isActive ? "bg-gray-600" : ""}
          `}
        > 
          <img src={assets.list_icon} alt="" className='w-5' />
          <p>Blog List</p>
        </NavLink>

        
        <NavLink  to='/admin/comments' 
          className={({isActive}) => `
            flex items-center gap-3 py-3 px-4 rounded-lg 
            hover:bg-orange-700 transition-colors
            ${isActive ? "bg-gray-600" : ""}
          `}
        > 
          <img src={assets.comment_icon} alt="" className='w-5' />
          <p>Comments</p>
        </NavLink>

        
      </div>
    </div>
  )
}

export default Sidebar