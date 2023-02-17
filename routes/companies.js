const express=require('express');
const { verifyUser } = require('../authenticate');
const Job = require('../models/job');
const Jobrouter=express.Router();

Jobrouter.route('/')
.get(verifyUser, (req,res,next)=>{
  Job.find()
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp)
  })
})

module.exports=Jobrouter;