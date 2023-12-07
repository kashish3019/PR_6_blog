const { user } = require("../models/user.schema");


const getSignup = async(req,res)=>{
    try {
        let data = await user.findOne({email : req.body.email});
        if(!data){
            let data=await user.create(req.body)
            return res.cookie("id", data.id).cookie("role", data.role).send("user already exists");        }
        else{
            let data = await user.create(req.body);
            return res.cookie("id", data.id).cookie("role", data.role).send(`Account created successfully ${data.username}`);
        }
        
    } catch (error) {
        return res.send({error:"errors"})
    }
}

const signup = (req,res)=>{
    res.render("signup")
}

const getLogin = async(req,res)=>{
    try {
        let data = await user.findOne({email : req.body.email});
        if (!data){
            return res.send(`Invalid Credentials.`)
        }

        if(data.password != req.body.password){
            return res.send(`Invalid Credentials.`)
        }

        return res.cookie("role", data.role).cookie("id", data.id).send(`Welcome User ${data.username}`);

    } catch (error) {
        return res.send(error.message)
    }
}

const login = (req,res)=>{
    res.render("login")
}
module.exports = {signup, login, getSignup, getLogin}