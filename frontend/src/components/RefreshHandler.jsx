import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthonticated}) => {
    const location = useLocation()
    const navigation = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthonticated(true)
            if(location.pathname === '/' || location.pathname === "/login" || location.pathname ==='/signup'){
                navigation('/home',{replace :false})
            }
        }
    },[location , navigation ,setIsAuthonticated])
  return (
     null
  )
}

export default RefreshHandler