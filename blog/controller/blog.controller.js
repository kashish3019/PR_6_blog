const { blog } = require("../Models/Blog.schema");
const Fuse = require('fuse.js');
const { user } = require("../models/user.schema");

//get
const createget = (req, res) => {
    res.render("blog")
}

const getindex = (req, res) => {
    res.render("index")
}


const allblog = async (req, res) => {
    try {
        let data = await blog.find();
        return res.send(data);

    } catch (error) {
        return res.send(error.message);
    }
}

const createdata = async(req,res)=>{
    try {
        const {title,content,image,category}=req.body
        const addblog = {
        title:title,
        content:content,
        image:image,
        author:req.cookies.author,
        category:category
        }
        const data = await blog.create(addblog)
        return res.cookie('blogId',data.id).send(`blog created by ${req.cookies.author}`)
    } catch (error) {
        return res.send({error:error})
    }
}

const blogdelete = async (req, res) => {
    let { id } = req.params;
    let data = await blog.findByIdAndDelete(id);
    try {
        if (data) res.redirect("/blog");
        else {
            res.send("no found");
        }
    } catch (error) {
        res.send("testing");
    }
};

const blogedit = async (req, res) => {
    let { id } = req.params;
    let data = await blog.findByIdAndUpdate(id, req.body);
    try {
        if (data) res.send("updated");
        else {
            res.send("not found");
        }
    } catch (error) {
        res.send("testing");
    }
};

const singleblogs = async (req, res) => {
    try {
        let { id } = req.params;
        let singleBlog = await blog.findById(id);
        res.render("singleblogpage", { singleBlog });
    } catch (error) {
        return res.send(error.message)
    }
};

const search = async(req,res)=>{
    try {
        const query = req.query.blogs;
        const blogs = await blog.find()
        const options = {
            keys:["author", "category", "title"]
        }
        const fuse = new Fuse(blogs,options);
        const result = fuse.search(query)
        return res.send(result)
        
    } catch (error) {
        return res.send({error:error})
    }
}

const like = async(req,res)=>{
    try {
        let {id} = req.cookies
        let blogId = req.params.id
        const like = await user.findById(id)
        const data = await blog.findById(blogId)
        data.likedBy.push( {username:like.username} )
        await data.save()
        return res.send(data)
    } catch (error) {
        res.send({error:error})
    }
}

const comment = async(req,res)=>{
    try {
        let {id} = req.cookies
        let blogId = req.params.id
        const comment = await user.findById(id)
        const data = await blog.findById(blogId)
        let result = {
            text:req.body.text,
            username:comment.username
        }
        data.comments.push(result)
        await data.save()
        return res.send(data)
    } catch (error) {
        res.send({error:error})
    }
}

module.exports = { createdata,createget, getindex, allblog, search, blogdelete, blogedit, singleblogs, like, comment }