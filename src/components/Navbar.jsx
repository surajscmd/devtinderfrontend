import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Base_Url } from '../utils/constant'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () =>{
    try {
      const res = await axios.post(Base_Url + "/Logout", {} ,{withCredentials: true})
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error)
      // redirect to error page
    }
  }
  return (
    <div className="navbar bg-base-300 fixed top-0 w-full z-10">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Dev-Connect</Link>
  </div>
  {user && (<div className="flex-none gap-2"> 
    <div className="dropdown dropdown-end">
      <div className='flex items-center justify-center'>
      <p>
  {user?.firstName && user?.lastName &&
    `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} 
     ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`
  }
</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
        <div className="w-7 rounded-full">
          <img
            alt="user"
            src={user?.photoUrl} />
        </div>
      </div> 
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between" >
            Profile
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li> <Link to="/connection" className="justify-between" >
            Connection
            {/* <span className="badge">New</span> */}
          </Link></li>
          <li> <Link to="/connectionrequest" className="justify-between" >
            Request
            {/* <span className="badge">New</span> */}
          </Link></li>
          <li> <Link to="/membership" className="justify-between" >
            Membership
            {/* <span className="badge">New</span> */}
          </Link></li>
        <li><a onClick={handlelogout}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default Navbar