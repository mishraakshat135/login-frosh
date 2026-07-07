import { useState } from "react";
import api from "../services/api"
import {useNavigate} from 'react-router-dom'
import loginBg from '../assets/login_page.webp'

export default function Login() {



  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res = await api.post(
      "/api/auth/login",
      formData
    );
    localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
    alert("Login Successful");
    navigate("/home")
    
  } catch (error) {
    alert(error.response.data.message);
  }
  };

  return (

    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${loginBg})`,}}>
    <div  className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full relative max-w-md bg-white/10 backdrop-blur-2xl  rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.45)] overflow-hidden p-10 border border-white/15">
        <div className=" absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-blue-400/10 pointer-events-none" />
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>

            <input type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} className="w-full border border-white/15 bg-white/5 backdrop-blur-md text-white placeholder:text-gray-400 transition-all duration-300  rounded-xl px-5 py-4 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30 focus:bg-white/10" required />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>

            <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} className="w-full border border-white/15 bg-white/5 backdrop-blur-md text-white placeholder:text-gray-400 transition-all duration-300  rounded-xl px-5 py-4 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30 focus:bg-white/10" required
            />
          </div>

          <button type="submit" className="w-full mt-4 text-white py-4 rounded-xl font-semibold bg-linear-to-r from-orange-500 to-red-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba[255,110,64,0.5] active:scale-95 ">
            Login
          </button>

        </form>
      </div>
    </div>
   
    </div>
  );
}