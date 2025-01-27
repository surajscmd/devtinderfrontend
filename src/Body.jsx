import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './elements/Footer'
import axios from 'axios'
import { Base_Url } from './utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store?.user)
  const fetchUser = async ()=>{
    try {
      const res = await axios.get(Base_Url + "/profile/view",{
        withCredentials: true
      });
      dispatch(addUser(res?.data?.user));
    } catch (error) {
      if(error.status === 401){
        navigate("/login")
      }
      console.error(error)
    }
  };
  useEffect(()=>{
  if(!userData){
    fetchUser();
  }
  },[]);

  return (
    <div>       
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body