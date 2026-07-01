import { useState } from "react";
import api from "../services/api"
import {useNavigate} from 'react-router-dom'


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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Username
            </label>

            <input type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}