import { use, useState } from "react";

const EditProfile = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender,setGender] = useState("");
    const [about, setAbout] = useState("");
    const [error,setError] = useState();


  return (
    <>
        <div className="flex justify-center mb-10 mt-5">    
    <div className="card w-96  bg-base-200 shadow-xl rounded-2xl border border-base-300">
      <div className="card-body space-y-3">
        <h2 className="card-title text-2xl font-semibold text-blue-500 justify-center">
          Edit Profile
        </h2>

        <div className="">
            <div className="form-control w-full max-w-xs">
            <label className="label " htmlFor="firstName">
              <span className="label-text">First Name</span>
              
            </label>

            <input
              id="firstName"
              type="firstName"
              value={firstName}
              placeholder="Enter your First Name"
              className="input input-bordered w-full my-1 p-2"
              onChange={(e)=>{
                setFirstName(e.target.value);
              }}
            />
            <label className="label mt-2" htmlFor="lastName">
              <span className="label-text">Last Name</span>
              
            </label>

            <input
              id="lastName"
              type="lastName"
              value={lastName}
              placeholder="Enter your Last Name"
              className="input input-bordered w-full my-1 p-2"
              onChange={(e)=>{
                setLastName(e.target.value);
              }}
            />
            <label className="label mt-2" htmlFor="age">
              <span className="label-text">Age</span>
              
            </label>

            <input
              id="age"
              type="age"
              value={age}
              placeholder="Enter your Age"
              className="input input-bordered w-full my-1 p-2"
              onChange={(e)=>{
                setAge(e.target.value);
              }}
            />
            <label className="label mt-2" htmlFor="gender">
              <span className="label-text">Gender</span>
              
            </label>

            <input
              id="gender"
              type="gender"
              value={gender}
              placeholder="Enter your Gender"
              className="input input-bordered w-full my-1 p-2"
              onChange={(e)=>{
                setGender(e.target.value);
              }}
            />
            <label className="label mt-2" htmlFor="about">
              <span className="label-text">About</span>
              
            </label>

            <input
              id="about"
              type="about"
              value={about}
              placeholder="Enter something about you"
              className="input input-bordered w-full my-1 p-2"
              onChange={(e)=>{
                setAbout(e.target.value);
              }}
            />

            
          </div>


        </div>
        <p className="text-red-500">{error}</p> 

        <div className="card-actions justify-center ">
          <button className= " px-3 btn bg-blue-600 border border-base-300 hover:bg-base-200 transition-all rounded-xl"
            
          >
            Save Profile
          </button>

        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default EditProfile