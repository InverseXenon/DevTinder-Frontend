import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const requests = useSelector((store)=> store.requests);
    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true
            });
            console.log(res.data.data);
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };
    const reviewRequest = async (status,_id)=>{
        try {
            await axios.post(BASE_URL+"/request/review/"+status+"/"+ _id,{},{
                withCredentials:true,
            });
            dispatch(removeRequest(_id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchRequests();
    },[]);

    if(!requests) return null;

    if(requests.length === 0){
        return(
            <>
                <div className='flex justify-center my-10'>
                    <h1 className='font-bold text-2xl'>Requests</h1>                    
                </div>
                <div className='flex justify-center'>
                    <h1 className='font-bold text-lg'>No Requests Found!</h1>
                </div>
                
            </>
        )
    }

  return (
    <div className=' text-center my-10'>
        <h1 className='font-bold text-2xl'>Requests</h1>
        <div className='flex flex-wrap'>
        {requests.map((request)=>{
            const {_id,firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
        return(

            <div key={_id} className="card bg-base-100 w-52 m-7 shadow-sm">
            <figure>
                <img
                src={photoUrl}
                alt={firstName} />
            </figure>
            <div className="card-body ">
                <h2 className="card-title flex justify-center font-bold text-xl text-center">
                {firstName}  {lastName}
                </h2>
                <p>{about}</p>
            </div>
            <div>
                <button className="btn bg-red-500 mx-4 p-2 rounded-xl " onClick={()=>{reviewRequest("rejected",request._id)}}>Reject</button>   
                <button className="btn bg-green-600 mx-4 p-2 rounded-xl" onClick={()=>{reviewRequest("accepted",request._id)}}>Accept</button>                 
            </div>
            </div>
        )})}
        </div>

    </div>
  )
}

export default Requests;