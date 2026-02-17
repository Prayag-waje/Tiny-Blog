import Blog from "../models/Blog.js";
import JWT from "jsonwebtoken";

const postBlog = async(req, res) => {
    const { title, category, content} = req.body;

    const {user} = req;

    if(!title || !category || !content){
        res.status(400).json({
            success: false,
            message: "All feilds are required"
        })
    }

    const newBlog = new Blog({
        title,
        category,
        content,
        author: user?.id,
        slug: `temp-slug-${Date.now()}-${Math.random().toString()}`.replace(/[^\w-]+/g,""),
    });

    const saveBlog = await newBlog.save();

    saveBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${saveBlog._id}`;

    await saveBlog.save();

    res.status(201).json({
        success: true,
        message: "blog created successfully",
        Blog: saveBlog
    })
}

const getBlogs = async (req, res) => {

    const {author} = req.query;

    const condition = [{status: "published"}];

    if(author){
        condition.push({author: author});
    }

    let blogs = await Blog.find(
        {$or: condition}
    )
    .populate('author', '_id name email').sort({status: -1});
    res.status(200).json({
        success: true,
        data: blogs,
        message: "Blogs fetched successfully"
    })
}

const getBlogsBySlug = async (req, res) => {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug: slug}).populate('author', '_id name email');

    if(!blog){
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        })
    }

    res.status(200).json({
        success: true,
        data: blog,
        message: "Blog fetchded successfully"
    })
}

const patchPublishBlog = async (req, res) => {
    const {slug} = req.params;

    const {user} =req;

    const blog = await Blog.findOne({slug: slug});

    if(!blog){
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        })
    }

    if(blog.author.toString() !== user?.id){
        return res.status(403).json({
            success: false,
            message: "you are not eligible to publish this blog"
        })
    }

    const updatedBlog = await Blog.findOneAndUpdate(
        {slug: slug},
        {status: "published"},
        {new: true}
    )

    res.status(200).json({
        success: true,
        message: "Blog published successfully",
        data: updatedBlog
    })
}

const putBlog = async (req, res) => {
    const {slug} = req.params;
    const {title, category, content} = req.body;

    const {user} = req;

    const existingBlog = await Blog.findOne({slug: slug});

    if (!existingBlog){
        return res.status(404).json({
            success: false,
            message:"Blog not found"
        })
    }

    if(existingBlog.author.toString() !== user?.id){
        return res.status(403).json({
            success: false,
            message: "you are not eligible to change this blog "
        })
    }

    if(!title || !category || !content){
        return res.status(400).json({
            success: false,
            message: "All feilds are required"
        })
    }

    const blog = await Blog.findOneAndUpdate(
        {slug: slug},
        {
            title,
            category,
            content
        },
        {new: true}
    );

    res.status(200).json({
        success: true,
        message: "Blog updated successfully"
    })
}

export { postBlog, getBlogs, getBlogsBySlug, patchPublishBlog, putBlog };