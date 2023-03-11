const express=require('express');
const User = require('../models/user');
const Poser=express.Router();

Poser.route('/')
.get((req,res,next)=>{
    User.find(req.user._id)
    .then((respone)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(respone)
    })
})