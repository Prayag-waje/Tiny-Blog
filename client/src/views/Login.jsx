import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const loginUser = async() => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      user,
    );
    if(response?.data?.success){
      localStorage.setItem("loginInUSer:", JSON.stringify(response.data.user))

      window.location.href="/";
    }
  }

  return (
    <div>
      <h1 className="text-center text-4xl my-4">Login</h1>

      <div className="max-w-100 mx-auto px-12 border rounded py-8 border-gray-400">       
        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded w-full mb-4"
          value={user.email}
          onChange={(e) =>{
            setUser({...user, email: e.target.value})
          }}
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={user.password}
          onChange={(e) =>{
            setUser({...user, password: e.target.value})
          }}
        />
        <button className="bg-gray-400 text-white px-4 py-2 rounded w-full"
          type='botton'
          onClick={loginUser}
        >Login</button>

        <p className="mt-4">Don't have an account?
          {""}
          <Link to="/Signup" className="text-blue-500">SignUp</Link>
        </p>
      </div>

    </div>
  )
}

export default Login
