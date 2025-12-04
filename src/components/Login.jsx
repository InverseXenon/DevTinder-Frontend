import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId,setEmailId] = useState("piyushpatil1741@gmail.com");
  const [password,setPassword] = useState("Piyush@123");
  const handleLogin = async () =>{
    try {
      axios.post("http://localhost:3000/login",{
      emailId,
      password,
    },{
      withCredentials:true,
    })
    } catch (error) {
      console.log(error);
    }
    
  }
  
  return (
    <div className="flex justify-center my-10">    
    <div className="card w-96 bg-base-200 shadow-xl rounded-2xl border border-base-300">
      <div className="card-body space-y-3">
        <h2 className="card-title text-2xl font-semibold text-blue-500 justify-center">
          Login
        </h2>

        <div className="">
            <div className="form-control w-full max-w-xs">
            <label className="label " htmlFor="email">
              <span className="label-text">Email</span>
              
            </label>

            <input
              id="email"
              type="email"
              value={emailId}
              placeholder="Enter your email"
              className="input input-bordered w-full my-2 p-2"
              onChange={(e)=>{
                setEmailId(e.target.value);
              }}
            />
            <label className="label mt-4" htmlFor="email">
              <span className="label-text">Password</span>
              
            </label>

            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your email"
              className="input input-bordered w-full my-2 p-2"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />

            
          </div>


        </div>
        

        <div className="card-actions justify-center mt-4">
          <button className= " mt-1 px-3 btn bg-blue-600 border border-base-300 hover:bg-base-200 transition-all rounded-xl"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
