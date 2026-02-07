import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../util';
import BlogCard from '../components/BlogCard.jsx';
import axios from 'axios';

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async() =>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ''}`);
    setBlogs(response.data.data);
  }

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  return (
    <div>
      <h1>All Blogs</h1>
      {user ? `Hello, ${user.name}!` : 'Hello, Guest!'}
      <div className=' container mx-auto p-6'>
        {blogs.map((blog) => {
          const {
            _id, title, content, author, createdAt, updatedAt, status, category, slug
          } = blog;
          return (
            <BlogCard
              key = {_id}
              title={title}
              content={content}
              author={author}
              createdAt={createdAt}
              updatedAt={updatedAt}
              status={status}
              category={category}
              slug={slug}
            />
            
          )
        })}
      </div>
    </div>
  )
}

export default AllBlogs
