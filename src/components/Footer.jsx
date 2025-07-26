import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-10 bg-gray-200'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500 text-gray-500'>
          <div>
            <div className='flex gap-5'>
              <img src="/favicon.png" alt="logo" className='w-14 sm:w-20'></img>
              <h1 className='mt-5 font-bold text-xl text-orange-500'>BlogBuddie</h1>
            </div>
            
            <p className='max-w-[410px] mt-6'>
              BlogBuddie is a blogging platform that allows users to create, share, and discover blogs on various topics. 
              It provides a user-friendly interface for writing and reading blogs, making it easy for anyone to join the blogging community.
            </p>

          </div>

          <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
              {footer_data.map((section,index)=>(
                <div key={index}>
                   <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                   <ul className='text-sm space-y-1'>
                     {section.links.map((link,index)=>(
                      <li key={index}>
                        <a href="#" className='hover:underline transition'>{link}</a>
                      </li>
                     ))}
                   </ul>
                </div>
              ))}
          </div>
            
        </div>
        <p className='py-4 text-center text-sm md:text-base text-white'>Copyright 2025 &copy; BlogBuddie.All rights reserved</p>
    </div>
  )
}

export default Footer