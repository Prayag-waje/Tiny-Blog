import express from 'express';
import cors from 'cors';
import mongoose, { get } from 'mongoose';
import dotenv from 'dotenv';
import { postSignup, postLogin } from './controllers/user.js';
import { postBlog, getBlogs, getBlogsBySlug, patchPublishBlog, putBlog } from './controllers/blog.js';
import Jwt from 'jsonwebtoken';

dotenv.config();

const app =express();

app.use(express.json());
app.use(cors());

const requestCount = 0;

const connectDB = async () => {
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
        succes: true,
        message: "Server is running",
    })
})

const JwtCheck = (req, res, next) => {
    req.user = null;
    const {autthorization} = req.header;
    if(!autthorization){
        return res.status(400).json({ message: "Authorization token missing"});
    }

    try{
        const token = autthorization.split(" ")[1];
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);  
        console.log("Decoded JWT:", decoded);
        req.user = decoded; 

        next();
    }catch(error){
        return res.status(401).json({ message: "Invalid token"})
    }
}

app.post("/signup", postSignup);
app.post("/login", postLogin);

app.post("/blogs", postBlog);
app.get("/blogs", getBlogs);

app.get("/blogs/:slug", getBlogsBySlug);
app.patch("/blogs/:slug/publish", patchPublishBlog);
app.put("/blogs/:slug", putBlog)



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
