import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)

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

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="text-5xl w-20 h-20 mx-auto flex items-center justify-center">
            <div>
                <FaRegUser />
            </div>
            
          </div>
          <form className="pt-6 flex flex-col gap-3" onSubmit={handldeSubmit}>
            <div className="grid">
              <label>Email</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
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
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-blue-600"
              >
                Forgot Password
              </Link>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 ">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account?
            <Link
              to={"/sign-up"}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
