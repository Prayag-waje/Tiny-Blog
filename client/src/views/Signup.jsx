import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const SignupUser = async() =>{
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/signup`,
      user
    )
    if(response?.data?.success){
      localStorage.setItem("loginInUSer", JSON.stringify(response.data.user))

      window.location.href = "/";
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl my-4">Sign-Up</h1>

      <div className="max-w-100 mx-auto px-12 border rounded py-8 border-gray-400">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded w-full mb-4"
          value={user.name}
          onChange={(e) => {
            setUser({...user, name: e.target.value})
          }}
        />
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
          type="button"
          onClick={SignupUser}
        >Sign Up</button>

        <p className="mt-4">Already have an account?
          {""}
          <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>

    </div>
  )
}

export default Signup
