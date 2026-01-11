import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import NoUsersLeft from "./NoUsersLeft";


const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () =>{
    if(feed) return;
    try {const res = await axios.get(BASE_URL+"/user/feed",
      {
        withCredentials:true,headers: {
      "Cache-Control": "no-cache"
    }});
    dispatch(addFeed(res.data));
    
  }
    catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
      getFeed();
  },[]);
  if (!feed || feed.length === 0){
      <NoUsersLeft />
    }
  
  
  return feed && (
    
    <div className="flex justify-center mb-10 mt-5"><UserCard user = {feed[0]} /></div>
  )
}

export default Feed