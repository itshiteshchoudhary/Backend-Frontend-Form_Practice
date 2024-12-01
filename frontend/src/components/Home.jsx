import React, { useEffect, useState } from 'react'
import { handelError, handelSuccess } from './alert'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'

const Home = () => {
  const [logInUser, setLoginUser] = useState("")
  const [products , setProducts] = useState([])

  useEffect(() => {
    setLoginUser(localStorage.getItem('logInUser'))
  }, [])

  const navigate = useNavigate()
  const handleLogout = (e) => {
    handelSuccess("user loged out successfully")
    localStorage.removeItem('token')
    localStorage.removeItem('logInUser')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products"
      const result = await axios(url,{
        headers :{
          'Authorization' : localStorage.getItem('token')
        }
      })
      console.log(result.data);
      setProducts(result.data)
    } catch (error) {
      handelError(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  },[])

  return (
    <div className='flex flex-col items-center gap-7 border-2 mt-[15%] h-[220px] bg-slate-500'>
      <h1 className='my-4 font-bold text-2xl'> Welcome {logInUser}</h1>
      <div>
        {
          products.map((item)=>(
            <ul>
              <span>{item.name}</span>
              <span> {item.price}</span>
            </ul>
          ))
        }
      </div>
      <button onClick={handleLogout} className='rounded-tl-[20px] w-[120px] rounded-br-[20px] bg-slate-800 py-2'>Logout</button>
      <ToastContainer />
    </div>
  )
}

export default Home