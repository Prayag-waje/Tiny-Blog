import express from 'express';
import cors from 'cors';
import mongoose, { get } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { postSignup, postLogin } from './controllers/user.js';
import { postBlog, getBlogs, getBlogsBySlug, patchPublishBlog, putBlog } from './controllers/blog.js';
import Jwt from 'jsonwebtoken';
import Blog from './models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app =express();

app.use(express.json());
app.use(cors());

const requestCount = 0;

const connectDB = async () => {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if(conn){
            console.log("mongodb connected");
        }
    }catch(error){
        console.error("MongoDB connected error:", error)
    }
}

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
    })
})

const JwtCheck = (req, res, next) => {
    req.user = null;
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(400).json({ message: "Authorization token missing"});
    }

    try{
        const token = authorization.split(" ")[1];
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);  
        console.log("Decoded JWT:", decoded);
        req.user = decoded; 

        next();
    }catch(error){
        return res.status(401).json({ message: "Invalid token"})
    }
}

const viewCountMiddleware = async(req, res, next) => {
    const {slug} = req.params;
    try{
        const blog = await Blog.findOne({slug});
        if(blog){
            blog.viewcount += 1;
            await blog.save();
        }

    } catch(error){
        console.error(" Error updating view count:", error);
    }
    next();
}

app.post("/signup", postSignup);
app.post("/login", postLogin);

app.post("/blogs", JwtCheck, postBlog);
app.get("/blogs", getBlogs);

app.get("/blogs/:slug", viewCountMiddleware, getBlogsBySlug);
app.patch("/blogs/:slug/publish", JwtCheck, patchPublishBlog);
app.put("/blogs/:slug", JwtCheck, putBlog)



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
