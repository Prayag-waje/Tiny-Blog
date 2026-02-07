import { useState, useEffect, use } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import MarkdownEditor from "@uiw/react-markdown-editor";

function ReadBlogs() {
  const {slug} = useParams();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () =>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
    setBlog(response.data.data);
  }

  useEffect(() =>{
    document.documentElement.setAttribute('data-color-mode', 'light');
    fetchBlog();
  },[]) 

  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-2xl mb-2">{blog.title}</h2>
      <p>{blog.publishedAt || blog.createdAt}</p>
      <div className='flex items-center gap-4 my-2'>
        <span className="text-lg font-semibold bg-orange-400 px-4 py-1 rounded-full text-white">{blog.category}</span>

          <div className='flex items-center justify-center font-semibold w-12.5 h-12.5 bg-blue-300 rounded-full text-white text-2xl '>
            {blog?.author?.name.substring(0,1)}
          </div>

          <div>
            <p>{blog?.author?.name}</p>
            <p>{blog?.author?.email}</p>
          </div>
      </div>

      <MarkdownEditor.Markdown
        source={blog.content}
        height="50px"
      />
    </div>
  )
}

export default ReadBlogs
