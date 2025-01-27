import React from 'react'

const ConnectionCard = ({user}) => {
  return (
    <div className="text-center  my-10 w-1/4">
    <p className="font-bold text-2xl text-primary">
      <div className="card card-side bg-base-300 shadow-xl">
        <figure>
          <img className="w-28 mb-3 rounded-full shadow-lg"
            src={user?.photoUrl}
            alt="pick"
          />
        </figure>
        <div className="card-body flex flex-col items-center pb-10">
          <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
          <p className="mb-1 text-sm font-light text-gray-900 dark:text-white">{ user?.age + " , " + user?.gender}</p>
          <h5 className="mb-1 text-sm font-light text-gray-900 dark:text-white">{user?.about}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user?.skills}</span>
          
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Reject</button>
            <button className="btn btn-secondary">accept</button>
          </div>
        </div>
      </div>
    </p>
  </div>
  )
}

export default ConnectionCard