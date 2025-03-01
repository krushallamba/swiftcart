import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import imageTobasse64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate()

    const handleOnChange = (e) => {
      const {name, value} = e.target;
      setData((prev) => {
        return {
          ...prev,
          [name]: value
        };
      });
    };

    const handldeSubmit = async (e)=>{
      e.preventDefault();

      if(data.password === data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signUp.url, {
          method: SummaryApi.signUp.method,
          headers: {
            "content-type":"application/json"
          },
          body: JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()

        if(dataApi.success){
          toast.success(dataApi.message);
          navigate('/login')
        }
        if(dataApi.error){
          toast.error(dataApi.message);
        }
      }
      else{
        toast.error("Please check confirm password");
        console.log("Please check confirm password")
      }

    }

    const handleUploadPic = async (e)=>{
        const file = e.target.files[0]
        const imagePic = await imageTobasse64(file)
        setData((prev)=>{
            return{
                ...prev,
                profilePic: imagePic
            }
        })
    }

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="text-5xl w-20 h-20 mx-auto flex flex-col items-center justify-center relative overflow-hidden rounded-full">
            <div>
                {data.profilePic ? <img src={data.profilePic} /> : <FaRegUser />}
                
            </div>
            <form>
                <label>
                    <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 left-0 w-full">
                        Upload Photo
                    </div>
                    <input type='file' className='hidden' onChange={handleUploadPic} />
                </label>
                
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-3" onSubmit={handldeSubmit}>
            <div className="grid">
              <label>Name</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <IoEyeOff /> : <IoEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>{showConfirmPassword ? <IoEyeOff /> : <IoEye />}</span>
                </div>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 ">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account? 
            <Link
              to={"/login"}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
