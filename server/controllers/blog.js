import Blog from "../models/Blog.js";

const postBlog = async(req, res) => {
    const { title, category, content, author} = req.body;

    if(!title || !category || !content ||! author){
        res.status(400).json({
            success: false,
            message: "All feilds are required"
        })
    }

    const newBlog = new Blog({
        title,
        category,
        content,
        author,
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

export { postBlog} ;