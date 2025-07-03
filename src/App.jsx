import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog/:id' element={<Blogs/>}></Route>
      </Routes>
    </div>
  )
}

export default App