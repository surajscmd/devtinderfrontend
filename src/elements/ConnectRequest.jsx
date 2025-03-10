import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../utils/requestSlice';
import axios from 'axios';
import { Base_Url } from '../utils/constant';
import ConnectionCard from '../components/ConnectionCard';

const ConnectRequest = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  
  const fetchrequest = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/requests/received", {
        withCredentials: true,
      });
        dispatch(addrequest(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchrequest();
  }, []);

  const reviewRequest = async (status , _id) =>{
    try {
      const response = await axios.post(Base_Url + "/request/review" +"/" + status + "/" +  _id,{},{
        withCredentials: true,
      });
      dispatch(removerequest(_id))
    } catch (error) {
      console.error(error);
    }
  }

  if (!request) return null;

  if (!request.length) {
    return (
      <div className="flex justify-center my-10">
        <p>No Connection Found</p>
      </div>
    );
  }

  return (
    <div className="text-center  mx-auto my-32 ">
    {request.map((data) => {
      console.log(data)
      const user = data.fromUserId;
     
      return (
        <div className="text-center mx-auto my-10 w-2/5" key={user._id} >
        <p className="font-bold text-2xl text-primary ">
          <div className="card card-side bg-base-300 p-10 shadow-xl flex flex-row items-center">
            <figure>
              <img className="w-28 h-28  rounded-full object-fill shadow-lg border-4 border-primary"
                src={user?.photoUrl}
                alt="pick"
              />
            </figure>
            <div className="card-body flex flex-col w-6/12 items-center pb-10">
              <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
              <p className="mb-1 text-sm font-light text-gray-900 dark:text-white">{user?.gender}</p>
              <h5 className="mb-1 text-sm font-light text-gray-900 dark:text-white">{user?.about}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{user?.skills}</span>
              
              <div className="card-actions justify-center my-4">
                <button className="btn btn-primary btn-wide" onClick={()=>reviewRequest("rejected", data._id)}>Reject</button>
                <button className="btn btn-secondary btn-wide" onClick={()=>reviewRequest("accepted", data._id)}>accept</button>
              </div>
            </div>
          </div>
        </p>
      </div>
      ) 
    })}
  </div>
  
  );
}

export default ConnectRequest