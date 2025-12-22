import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'
import AllBlogs from './views/AllBlogs'
import NewBlogs from './views/NewBlogs'
import EditBlogs from './views/EditBlogs'
import ReadBlogs from './views/ReadBlogs'
import Login from './views/Login'
import Signup from './views/Signup'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<AllBlogs />}/>
        <Route path = "/new" element = {<NewBlogs />}/>
        <Route path = "/edit/:id" element = {<EditBlogs />}/>
        <Route path = "/blog/:id" element = {<ReadBlogs />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/signup" element = {<Signup />}/>
        <Route path = "*" element = {<div></div>} />
      </Routes>
  </BrowserRouter>
)
