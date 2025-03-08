import axios from "axios";
import React from "react";
import { Base_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserfeed } from "../utils/feedSlice";
import { BookmarkX, MessageCircleHeart, UserRoundCheck } from "lucide-react";

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
          <img className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-primary" src={user?.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body text-center">
          <h2 className="font-bold text-2xl text-primary">
            {user?.firstName + " " + user?.lastName}
          </h2>
          {<p>{user.age + " , " + user.gender}</p>}
          {user?.about && <p>{user.about}</p>}
          {user?.skills && <p>{user.skills}</p>}
          <div className="card-actions justify-center my-4">
          
            <button className="btn btn-info " onClick={()=>handleSendRequest("interested", user?._id)}><UserRoundCheck size={32} strokeWidth={2.25}/></button>
            <button className="btn  btn-error " onClick={()=>handleSendRequest("ignored", user?._id)}><BookmarkX size={32} strokeWidth={2.25}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
