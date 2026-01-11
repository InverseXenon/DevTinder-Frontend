import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    if (!user) return (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold mb-2">
                You're all caught up!
            </h1>
            <p className="text-gray-400 max-w-sm">
                No more profiles to show right now.  
                Check back later for new connections!
            </p>
        </div>
    );
    const {_id,firstName,lastName,photoUrl, age, gender, about} = user;
    
    const handleSendRequest = async (status,userId) => {
        try {
            const res = await axios.post(BASE_URL+"/request/send/" + status + "/" + userId,{},{
                withCredentials:true});
                dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
    <>
        <div className="card bg-base-300  w-[23rem] shadow-lg">
            <figure>
                <img
                src={photoUrl}
                alt={firstName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex justify-center font-bold text-2xl">{firstName} {lastName}</h2>
                <p className="font-bold flex justify-center">{age} {gender?.charAt(0).toUpperCase() + gender?.slice(1)}</p>
                <p>{about}</p>
                <div className="card-actions justify-center my-1">
                    <button className="btn bg-red-700 p-2" onClick={()=>handleSendRequest("ignored",_id)}>
                        Ignore
                    </button>
                    <button className="btn bg-green-700 p-2" onClick={()=>handleSendRequest("interested",_id)}>
                        Interested
                    </button>
                </div>
            </div>
            </div>
    </>
  )
}

export default UserCard