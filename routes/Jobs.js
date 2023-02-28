const express=require('express');
const { verifyUser, verifyCompany } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const axios=require('axios')
const Jobs=express.Router()
const JobRouter=express.Router();
JobRouter.route('/')
.get((req,res,next)=>{
    Job.aggregate([  {
        $lookup: {
          from: "users",
          localField: "company",
          foreignField: "_id",
          as: "company"
        }},
        {
            $unwind: '$company'
          }, 
  {$match:{
        'company._id':req.user._id    
  }}
        ])
    
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    })
}
)




module.exports=JobRouter;