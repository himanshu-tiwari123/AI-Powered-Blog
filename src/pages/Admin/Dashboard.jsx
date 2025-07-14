import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'

const Dashboard = () => {
  const [dashboardData,setDashboardData] = useState({
    totalBlogs: 0,
    totalComments: 0,
    totalDrafts:0,
    recentBlogs:[],
  })

  const fetchDashboardData = async () => {
    setDashboardData(dashboard_data);
  }

  useEffect(()=>{
     fetchDashboardData();
  },[]);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
       <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded  shadow
          cursor-pointer hover:shadow-lg transition-shadow'>
            <img src={assets.dashboard_icon_1} alt="icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalBlogs}</p>
                <p className='text-gray-400 font-light'>Blogs</p>
              </div>
          </div>
       </div>
    </div>
  )
}

export default Dashboard