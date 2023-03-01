const express=require('express');
const { verifyUser, verifyCompany } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const axios=require('axios');
const Jobs=express.Router()
const JobRouter=express.Router();
const CompanyRouter=express.Router()
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
.post( (req, res, next) => {
    // Set the company field of the new job to the ID of the current user
    req.body.company = req.user._id;
  
    // Create the new job
    Job.create(req.body)
      .then(job => {
        return User.findByIdAndUpdate(req.user._id, { $push: { jobs: job._id } }, { new: true });
      })
      .then(user => {
 
        res.json(user);
      })
      .catch(err => {
        // Handle any errors
        next(err);
      });
  });
  







module.exports=JobRouter;