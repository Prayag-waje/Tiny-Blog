import { use, useEffect, useState } from "react"
import { getCurrentUser } from "../util"
import { Link } from "react-router"

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, [])

  return (
    <div className="bg-gray-400 text-white flex p-4 m-4 rounded justify-between">
        {" "}
        {user ? `Hello, ${user.name}!` : 'Hello, Guest!'}
        <div>
          {user ? (
          <span
            className="cursor-pointer ml-auto inline-block"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            >
            Logout
          </span>
          ) : (
            <Link to="/login">LogIn</Link>
          )}
        </div>
    </div>
  )
}

export default Navbar
