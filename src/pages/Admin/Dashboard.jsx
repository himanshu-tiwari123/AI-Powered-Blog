import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  })

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data:', dashboard_data); // Debug log
      setDashboardData(dashboard_data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Debug log to check if state is updating
  console.log('Current dashboard data:', dashboardData);

  return (
    
    <div className='flex-1 p-4 md:pl-70 bg-white-300/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow
          cursor-pointer hover:shadow-lg transition-shadow'>
          <img src={assets.dashboard_icon_1} alt="icon" className="w-20 h-20"/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>
                {dashboardData?.blogs || 0}
            </p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow
          cursor-pointer hover:shadow-lg transition-shadow'>
          <img src={assets.dashboard_icon_2} alt="icon" className="w-20 h-20"/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>
                {dashboardData?.comments || 0}
            </p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow
          cursor-pointer hover:shadow-lg transition-shadow'>
          <img src={assets.dashboard_icon_3} alt="icon" className="w-20 h-20"/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>
                {dashboardData?.drafts || 0}
            </p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>
      <div>
          <div className='flex items-center text-gray-600 m-4 mt-5 gap-4'>
            <img className='w-9 h-9' src={assets.dashboard_icon_4} alt="" />
            <p className='mt-1 text-xl'>Latest Blogs</p>
          </div>

          <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white-500'>
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
                {dashboardData.recentBlogs.map((blog,index)=>{
                   return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index+1}/>
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default Dashboard