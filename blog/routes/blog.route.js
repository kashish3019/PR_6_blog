const {Router} = require('express');
const { like, comment, search, blogedit, singleblogs, createdata, createget, getindex, allblog, blogdelete,   } = require('../controller/blog.controller');
const { findcookies, checkFiled, checksignupin } = require('../middleware/auth');
const brouter = Router();


brouter.get("/create",findcookies, createget);
brouter.post("/create", checkFiled, createdata);


brouter.get("/", getindex);

brouter.get("/blogs", allblog);

brouter.delete("/delete/:id", findcookies, blogdelete);

brouter.patch("/edit/:id", findcookies, blogedit);

brouter.get("/singleblog/:id", singleblogs);

brouter.patch("/like/:id",checksignupin, like);

brouter.patch("/comment/:id",checksignupin , comment);

brouter.get("/search", search);

module.exports = {brouter};