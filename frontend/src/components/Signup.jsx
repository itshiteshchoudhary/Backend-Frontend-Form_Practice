import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handelError, handelSuccess } from './alert'
import axios from 'axios'

const Signup = () => {
    const [signUp , setSignup] =useState({
        name : "",
        email : "",
        password : ""
       })
    
       const handelChange=(e)=>{
        const {name , value} = e.target
        // console.log(name ,value)
        const copySignupInfo = {...signUp}
        copySignupInfo[name]=value
        setSignup(copySignupInfo)
       }

       const navigate = useNavigate()

       const handelSubmit= async(e)=>{
        e.preventDefault()
        const {name,email,password}= signUp
        if(!name || !email || !password){
            return handelError("All fildes are require")
        }
            const url = "http://localhost:8080/auth/signup"
        try {
            const response = await axios.post(url , signUp)
            
            const {success , message , error} = response.data
            
            if(success){
                handelSuccess(message)
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }
            else if(error){
                handelError(message)
            }
            else if(!success){
                handelError(message)
            }
            
            console.log(response.data);       
            // const url = "http://localhost:8080/auth/signup"
            // const response = await fetch(url ,{
            //     method : "POST",
            //     headers : {
            //         'Content-Type' : "application/json"
            //     },
            //     body : JSON.stringify(signUp)
            // }) 
            // const result = await response.json()
            // console.log(result);            
        } catch (error) {
            handelError(error.message || "an error occure")
        }
       }

    return (
        <div>
            <div className=' flex items-center my-[10%] rounded-tl-[70px] rounded-br-[70px] bg-slate-600 border-4 flex-col'>
                <h1 className='my-4 font-bold text-2xl'>Signup</h1>
                <form onSubmit={handelSubmit} className='flex gap-6 flex-col'>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input onChange={handelChange}  type="text" name='name' autoFocus placeholder='Enter Your Name.....' className='ml-9 border-b-2 bg-transparent outline-none border-neutral-900 ' />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={handelChange} type="email" name='email' autoFocus placeholder='Enter Your Email' className='ml-10 border-b-2 bg-transparent outline-none border-neutral-900' />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={handelChange} type="password" name='password' autoFocus placeholder='Password' className='ml-3 border-b-2 bg-transparent outline-none border-neutral-900 '/>
                    </div>
                    <button className='rounded-tl-[20px] rounded-br-[20px] bg-slate-900 py-2' type='submit'>Submit</button>
                    <p className='mb-5'>Aleady have an accoutn?  <Link className=' text-purple-950' to="/login">Login</Link></p>
                </form>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default Signup