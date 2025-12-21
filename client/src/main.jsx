import { createRoot } from 'react-dom/client'
import { BrowserRouter as browserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import AllBlogs from './views/AllBlogs'
import NewBlogs from './views/NewBlogs'
import EditBlogs from './views/EditBlogs'
import ReadBlogs from './views/ReadBlogs'

createRoot(document.getElementById('root')).render(
  <browserRouter>
    <Routes>
      <Route path = "/" element = {<AllBlogs />}/>
      <Route path = "/new" element = {<NewBlogs />}/>
      <Route path = "/edit/:id" element = {<EditBlogs />}/>
      <Route path = "/blog/:id" element = {<ReadBlogs />}/>
      <Route path = "*" element = {<div><h1>404 Not Found</h1></div>} />
    </Routes>
  </browserRouter>
)
