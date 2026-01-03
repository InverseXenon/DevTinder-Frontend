import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () =>{
    // Clear Errors
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit",{firstName, lastName, photoUrl, age, gender, about},{
        withCredentials:true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() =>{
        setShowToast(false);
      },3000);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <> 
    <div className="flex justify-center mt-5 mb-36 ">
        <div className="flex justify-center mx-10">
      <div className="card w-96 bg-base-200 shadow-xl rounded-2xl border border-base-300">
        <div className="card-body space-y-2 py-4">
          <h2 className="card-title text-2xl font-semibold text-blue-500 justify-center">
            Edit Profile
          </h2>

          <div className="form-control w-full">

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3 ">
              <div>
                <label className="label">
                  <span className="label-text m-1">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First name"
                  className="input input-bordered w-full p-3 rounded-xl mt-1"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text m-1">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last name"
                  className="input input-bordered w-full p-3 rounded-xl mt-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Photo URL */}
            <label className="label mt-2">
              <span className="label-text m-1">Photo URL</span>
            </label>
            <input
              type="text"
              value={photoUrl}
              placeholder="Photo URL"
              className="input input-bordered w-full p-3 rounded-xl mt-1"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="label">
                  <span className="label-text m-1">Age</span>
                </label>
                <input
                  type="number"
                  value={age}
                  placeholder="Age"
                  className="input input-bordered w-full p-3 rounded-xl mt-1"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text m-1">Gender</span>
                </label>
                <input
                  type="text"
                  value={gender}
                  placeholder="Gender"
                  className="input input-bordered w-full p-3 rounded-xl mt-1"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>

            {/* About */}
            <label className="label mt-2">
              <span className="label-text m-1">About</span>
            </label>
            <textarea
              value={about}
              placeholder="Tell something about yourself"
              className="textarea textarea-bordered textarea-sm w-full p-3 rounded-xl mt-1"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <p className="text-red-500 text-center">{error}</p>

          <div className="card-actions justify-center">
            <button onClick={saveProfile} className="btn bg-blue-600 text-white hover:bg-blue-500 rounded-xl px-6">
              Save Profile
            </button>
          </div>
        </div>
      </div>
        </div>
        <UserCard user = {{firstName, lastName, photoUrl, age, gender, about}}/>
    </div>
    {showToast && <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Profile Updated successfully!</span>
      </div>
    </div>}
    </>
    
  );
};

export default EditProfile;
