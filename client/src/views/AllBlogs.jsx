import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../util';

function AllBlogs() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {user ? `Hello, ${user.name}!` : 'Hello, Guest!'}
      <h2>hello</h2>
    </div>
  )
}

export default AllBlogs
