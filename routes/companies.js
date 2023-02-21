const express=require('express');
const { verifyUser, verifyCompany } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const Jobrouter=express.Router();
const cors=require('cors')
Jobrouter.route('/')
.get(cors() ,verifyUser,verifyCompany, (req,res,next)=>{
  User.findById(req.user._id)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp)

  },(err)=>next(err))
  .catch((err)=>next(err))
})

.post(cors() ,verifyUser,(req,res,next)=>{
  req.body.company=req.user
  Job.create(req.body)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp)
  })
})

module.exports=Jobrouter;

