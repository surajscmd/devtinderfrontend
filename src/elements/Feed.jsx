import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice';
import { Base_Url } from '../utils/constant';
import CardComponent from '../components/CardComponent';

const Feed = () => {
  const dispatch = useDispatch();
 const feed = useSelector((store)=> store.feed);

 
 const getFeed = async () => {
  if (feed) return;
  try {
    const res = await axios.get(Base_Url + "/feed",{withCredentials: true});
    dispatch(addfeed(res?.data?.data));
  } catch (error) {
    console.error("Error fetching feed:", error);
    // Optionally, you can dispatch an error action or show an error message to the user
  }
};
useEffect(()=>{
  getFeed()
},[]);
  if(!feed) return;  
  return (
    feed && <div className='flex justify-center items-center my-20'>
      {feed.length == 0 ? " no user to show " :<CardComponent user={feed[0]}/> }
    </div>
  )
}

export default Feed