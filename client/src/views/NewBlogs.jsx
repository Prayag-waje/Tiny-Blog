import MarkdownEditor from '@uiw/react-markdown-editor';
import React, { useEffect, useState } from 'react';
import {BLOG_CATEGORIES} from './../constants';
import {getCurrentUser} from '../util';
import tost, {Toaster} from 'react-hot-toast';
import axios from 'axios';
function NewBlogs() {
  
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(BLOG_CATEGORIES[0])
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
    setUser(getCurrentUser());
  }, [])
  
  const saveBlog = async() => {
    try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`,{
      title,
      category,
      content,
      author: user?._id
    },
  {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

    if(response.data.success){
      tost.success("Blog created successfully");
      setTimeout(() => {
        window.location.herf = '/';
      }, 2000)
      
    }
    } catch(error){
      tost.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='mx-auto p-4 container'>
      <h1>New Blogs</h1>

      <input 
        type="text"  
        placeholder='Blog title'
        className='border p-2 w-full my-4 rounded'
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <select className='border mb-4 p-1 rounded'>
        {BLOG_CATEGORIES.map((cate) => {
          return (
            <option key={cate} value={cate}>{cate}</option>
          )
        })}
        
      </select>

      <MarkdownEditor
        value={content}
        onChange={(value) => {
          setContent(value)
        }}
        height='400px'
      />

      <button className='border p-2 px-7 text-xl mt-3 rounded bg-black text-white ' onClick={saveBlog}>
        Save
      </button>

    </div>
  )
}

export default NewBlogs
