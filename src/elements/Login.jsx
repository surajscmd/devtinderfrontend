import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constant";

const Login = () => {
  const [emailID, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [firstName , setfirstName] = useState("");
  const [lastName , setlastname] = useState("");
  
  const [ islogin , setislogin] = useState(false)

  const [error , setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const result = await axios.post(Base_Url + "/Login",{
        emailID, password,
      },{withCredentials: true});
      dispatch(addUser(result?.data));
      navigate("/");
    } catch (error) {
        setError(error?.response?.data || "something went wrong")
    }
  }
  const handleSignin = async () => {
    try {
      const result = await axios.post(Base_Url + "/signup",{
        firstName, lastName, emailID, password,
      },{withCredentials: true});
      dispatch(addUser(result?.data?.data));
      return navigate("/profile");
    } catch (error) {
        setError(error?.response?.data || "something went wrong")
    }
  }

  return (

      <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-8/12 p-10 ">
  <div className="card bg-base-300 shadow-xl p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-stretch">
    {/* Image container */}
    <figure className="w-full sm:w-60  flex justify-center mb-4 sm:mb-0 sm:block">
      <img
        className="w-60 h-auto object-cover"
        src="https://images.unsplash.com/photo-1650295751050-b184e54e177c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Movie"
      />
    </figure>
    {/* Form container */}
    <div className="card-body flex flex-col items-center sm:items-start p-10 ">
      <h2 className="card-title text-center sm:text-left text-lg sm:text-2xl">{!islogin?"Welcome Back!":"Is SignIn"}</h2>
      <div className="py-4 w-full">
        {islogin && ( <><label className="form-control w-full py-2">
          <div className="label">
            <span className="label-text">Enter your firstName</span>
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full py-2">
          <div className="label">
            <span className="label-text">Enter your lastName</span>
          </div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastname(e.target.value)}
            className="input input-bordered w-full"
          />
        </label></>)}


        <label className="form-control w-full py-2">
          <div className="label">
            <span className="label-text">Enter your user ID</span>
          </div>
          <input
            type="text"
            value={emailID}
            onChange={(e) => setEmailid(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full py-2">
          <div className="label">
            <span className="label-text">Enter password</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>
      </div>
      <p className="text-red-500 justify-center w-full">{error}</p>
      <p className="text-center  cursor-pointer m-0" onClick={()=>setislogin(!islogin)} >{!islogin? "New user? Signup here" : "Existing User? Login Here"}</p>
      <div className="card-actions justify-center w-full mt-4">
       
        <button className="btn btn-primary w-full sm:w-auto" onClick={!islogin? handleLogin : handleSignin}>
        {!islogin? "Login now" : "Register Now" }
        </button>
      </div>
    </div>
  </div>
</div>
      
      </>














    

  );
};

export default Login;
