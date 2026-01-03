import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error,setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () =>{
    
    try {
      const res = await axios.post(BASE_URL + "/login",{
      emailId,
      password,
    },{
      withCredentials:true,
    });
    dispatch(addUser(res.data));
    navigate("/")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
    
  }
  const handleSignUp = async () =>{
    try {
      const res= await axios.post(BASE_URL + "/signup",{firstName, lastName, emailId, password},{
        withCredentials:true
      });
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  }
  
  return (
    <div className="flex justify-center my-10">    
    <div className="card w-96 bg-base-200 shadow-xl rounded-2xl border border-base-300">
      <div className="card-body space-y-3">
        <h2 className="card-title text-2xl font-semibold text-blue-500 justify-center">
          {isLoginForm?"Login":"Sign Up"}
        </h2>

        <div className="">
            {!isLoginForm && (
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="firstName">
                <span className="label-text">First Name</span>
              </label>

              <input
                id="firstName"
                type="text"
                value={firstName}
                placeholder="Enter your First Name"
                className="input input-bordered w-full my-2 p-2"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label className="label" htmlFor="lastName">
                <span className="label-text">Last Name</span>
              </label>

              <input
                id="lastName"
                type="text"
                value={lastName}
                placeholder="Enter your Last Name"
                className="input input-bordered w-full my-2 p-2"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}



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
            <label className="label mt-4" htmlFor="password">
              <span className="label-text">Password</span>
              
            </label>

            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              className="input input-bordered w-full my-2 p-2"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />

            
          </div>


        </div>
        <p className="text-red-500">{error}</p> 

        <div className="card-actions justify-center my-4">
          <button className= " mt-1 px-3 btn bg-blue-600 border border-base-300 hover:bg-base-200 transition-all rounded-xl"
            onClick={isLoginForm?handleLogin:handleSignUp}
          >
            {isLoginForm?"Login":"Sign Up"}
          </button>

        </div>

        <div className="m-2 flex justify-end cursor-pointer" >
        <p onClick={()=> {setIsLoginForm((value)=>!value)}}>{isLoginForm? "New User? Sign Up!":"Already Existing User? Login"}</p>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
