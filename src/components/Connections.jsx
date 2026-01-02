import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store)=>store.connections)
    const dispatch = useDispatch();
    const fetchConnections = async () =>{
        try {
            const res = await axios.get(BASE_URL + "/user/connections",{
                withCredentials:true
            });
            
            dispatch(addConnections(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length === 0){
        return(
            <>
                <div className='flex justify-center my-10'>
                    <h1 className='font-bold text-2xl'>Connections</h1>                    
                </div>
                <div className='flex justify-center'>
                    <h1 className='font-bold text-lg'>No Connections Found!</h1>
                </div>
                
            </>
        )
    }

  return (
    <div className=' text-center my-10'>
        <h1 className='font-bold text-2xl'>Connections</h1>
        <div className='flex flex-wrap'>
        {connections.map((connection,index)=>{
            const {firstName, lastName, photoUrl, age, gender, about } = connection;
        return(

            <div key={index} className="card bg-base-100 w-52 m-7 shadow-sm">
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
            </div>
        )})}
        </div>

    </div>
  )
}

export default Connections