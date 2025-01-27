import React, { useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";
import { Base_Url } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  // Destructure user object
  // const { firstName, lastName, photoUrl, about, skills, gender, age } = user;

  // Initialize states with user data
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastname] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills || []);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const [showtost, setShowtost] = useState(false);

  const updatedUser = {
    firstName,
    lastName,
    photoUrl,
    about,
    skills,
    gender,
    age,
  };
  const dispatch = useDispatch();
  // Handle form submission

  const handleSubmit = async () => {
    setError("");
    setloading(true);
    try {
      const res = await axios.patch(
        Base_Url + "/profile/edit",
        { firstName, lastName, photoUrl, about, gender, skills, age },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowtost(true);
    } catch (error) {
      console.error(error);
      setError(error?.response?.data || "something went wrong");
    } finally {
      setloading(false);
      setTimeout(() => {
        setShowtost(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="fixed left-0 top-20">
           <CardComponent user={updatedUser} />
      </div>
       
      <div className="flex card bg-base-300 shadow-xl p-9 my-3 ml-80">
        <p class="text-center text-primary">Update Your profile</p>
        <div className="flex flex-col gap-5  mx-auto my-5 w">
          <div className="flex gap-2"> 
          <label className="input input-bordered flex items-center  gap-2">
            First Name:
            <input
              type="text"
              className="grow"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Last Name:
            <input
              type="text"
              className="grow"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>

          </div>
         
          <label className="input input-bordered flex items-center gap-2">
            Photo URL:
            <input
              type="text"
              className="grow"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Skills:
            <input
              type="text"
              className="grow"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          <div className="flex justify-between gap-8">
          <label className="input  input-bordered flex items-center gap-2">
            Age:
            <input
              type="number"
              className="grow"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 h-auto">
            Gender:
            <select
              className="select grow py-3 focus:outline-none focus:border-transparent"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Select your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
          </div>
         
          <label className="flex items-center gap-2">
            About:
            <textarea
              className="grow textarea textarea-bordered"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Bio"
            ></textarea>
          </label>
          <p className="text-red-500 justify-center w-full text-xs">{error}</p>

          <button onClick={handleSubmit} className="btn btn-primary">
            {loading ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
        
      </div>
      {showtost && (<div className="toast toast-top toast-end mt-14">
        <div className="alert alert-info">
          <span>Profile Updated Successfully!</span>
        </div>
      </div>)}
    </div>
  );
};

export default ProfileEdit;
