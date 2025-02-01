import React from 'react'
import { Link } from 'react-router-dom'

const ConnectionCard = ({user}) => {
  return (
    <div className="text-center mx-auto my-10 w-[900px]">
    <p className="font-bold text-2xl text-primary ">
      <div className="card card-side bg-base-300 shadow-xl px-10 py-1">
        <figure>
          <img className="w-28 h-28  rounded-full object-fill shadow-lg border-4 border-primary"
            src={user?.photoUrl}
            alt="pick"
          />
        </figure>
        <div className="card-body flex flex-col items-center pb-10 w-6/12">
          <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
          <p className="mb-1 text-sm font-light text-gray-900 dark:text-white">{ user?.age + " , " + user?.gender}</p>
          <h5 className="mb-1 text-sm font-light text-gray-900 dark:text-white">{user?.about}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user?.skills}</span>
         
          <Link to={"/chat/"+user?._id} ><button className="btn btn-neutral btn-wide">Chat</button></Link>
        </div>
        
         
    
      </div>
    </p>
  </div>
  )
}

export default ConnectionCard