const {Router} = require('express');
const { signup, login, getSignup, getLogin, } = require('../controller/user.controller');
const router = Router();


router.post("/signup", getSignup);

router.get("/signup", signup);

router.post("/login", getLogin);

router.get("/login", login);


module.exports = {router};