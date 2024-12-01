import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handelError, handelSuccess } from './alert'
import axios from 'axios'

const Login = () => {
  const [logIn, setLogin] = useState({
    email: "",
    password: ""
  })

  const nevigate = useNavigate()

  const handelChange=(e)=>{
    const {name , value} = e.target
    const copyLoginInfo = {...logIn}
    copyLoginInfo[name]=value
    setLogin(copyLoginInfo)
  }

  const handelSubmit =async(e)=>{
    e.preventDefault()
    const {email , password} = logIn
    if(!email || !password){
      return handelError('all fildes are require')
    }    
    const url = "http://localhost:8080/auth/login"
    try {
      const response = await axios.post(url,logIn)
      
      const {message, success,jwtToken,name ,error} = response.data
      
      if(success){
        handelSuccess(message)
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('logInUser',name)
        // console.log('its jwt token',jwtToken);
        
        setTimeout(()=>{
          nevigate('/home')
        },1000)
      }else if(error){
        handelError(message)
      }else if(!success){
        handelError(message)
      }
      
      // console.log('here is your data' , response.data);
      
    } catch (error) {
      handelError(error.message || "something went wrong will fetching API")      
    }
  }


  return (
    <div>
      <div className=' flex items-center my-[10%] rounded-tl-[70px] rounded-br-[70px] bg-slate-600 border-4 flex-col'>
        <h1 className='my-4 font-bold text-2xl'>Login</h1>
        <form onSubmit={handelSubmit} className='flex gap-6 flex-col'>
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={handelChange} type="email" name='email' autoFocus placeholder='Enter Your Email' className='ml-10 border-b-2 bg-transparent outline-none border-neutral-900' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={handelChange} type="password" name='password' autoFocus placeholder='Password' className='ml-3 border-b-2 bg-transparent outline-none border-neutral-900 ' />
          </div>
          <button className='rounded-tl-[20px] rounded-br-[20px] bg-slate-900 py-2' type='submit'>Submit</button>
          <p className='mb-5'>Don't have an accoutn?  <Link className=' text-purple-950' to="/signup">Signup</Link></p>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login