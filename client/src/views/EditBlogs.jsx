import MarkdownEditor from '@uiw/react-markdown-editor';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import {BLOG_CATEGORIES} from './../constants';
import {getCurrentUser} from '../util';
import tost, {Toaster} from 'react-hot-toast';
import axios from 'axios';
function EditBlogs() {
  
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(BLOG_CATEGORIES[0])
  const [user, setUser] = useState(null);
  const {slug} = useParams();

  const loadBlog = async() => {
    if(!slug) return;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
      const blogData = response?.data?.data;
      setTitle(blogData?.title);
      setContent(blogData?.content);
      setCategory(blogData?.category);

  }
  
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
    setUser(getCurrentUser());
    loadBlog();
  }, [])
  
  const updateBlog = async() => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${slug}`,{
      title,
      category,
      content,
    });

    if(response.data.success){
      tost.success("Blog created successfully");
      setTimeout(() => {
        window.location.herf = '/';
      }, 2000)
    }
  }

  const publishBlog = async() => {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`);

    if(response.data.success){
      tost.success("Blog published successfully");
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }

  return (
    <div className='mx-auto p-4 container'>
      <h1>New Blogs</h1>

      <input 
        type="text"  
        placeholder='Blog title'
        className='border p-2 w-full my-4 rounded'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <select 
        className='border mb-4 p-1 rounded'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
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

      <button className='border p-2 px-7 text-xl mt-3 rounded bg-black text-white ' 
      onClick={updateBlog}
      type='button'>
        Update
      </button>
      <button className='border p-2 px-7 text-xl mt-3 mx-4 rounded bg-black text-white ' onClick={() => {
        publishBlog();
      }} type='button'>
        Publish
        <Toaster />
      </button>

    </div>
  )
}

export default EditBlogs
