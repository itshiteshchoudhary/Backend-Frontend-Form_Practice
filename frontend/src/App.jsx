import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import 'react-toastify/dist/ReactToastify.css';
import RefreshHandler from './components/RefreshHandler'

const App = () => {
  const [isAuthonticated , setIsAuthonticated]=useState(false)

  const PrivateRoute=({element})=>{
    return isAuthonticated ? element : <Navigate to={"/login"}/>
  }

  return (  
    <BrowserRouter>
    <RefreshHandler setIsAuthonticated={setIsAuthonticated}/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App