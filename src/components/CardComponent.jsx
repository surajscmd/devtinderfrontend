import axios from "axios";
import React from "react";
import { Base_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserfeed } from "../utils/feedSlice";

const CardComponent = ({ user }) => {
  console.log(user?._id);
  const dispatch = useDispatch();
  const handleSendRequest = async (status , userId) =>{
    try {
      const res = await axios.post(Base_Url + "/request/send/" + status + "/" + userId ,{}, { withCredentials:true} )
      dispatch(removeUserfeed(userId))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl p-9">
        <figure>
          <img className="w-40 h-40 rounded-full object-fill shadow-lg border-4 border-primary" src={user?.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body text-center">
          <h2 className="font-bold text-2xl text-primary">
            {user?.firstName + " " + user?.lastName}
          </h2>
          <p>{user?.age + " , " + user?.gender}</p>
          <p>{user?.about}</p>
          <p>{user?.skills}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary btn-wide" onClick={()=>handleSendRequest("ignored", user?._id)}>Ignore</button>
            <button className="btn btn-secondary btn-wide" onClick={()=>handleSendRequest("interested", user?._id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
