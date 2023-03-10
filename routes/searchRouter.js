const express=require('express');
const search=express.Router();
const bodyParser=require('body-parser');
search.use(bodyParser.json());
const Job=require('../models/job');
const User=require('../models/user')
const cors=require('cors')
search.route('/')
.post(cors(),(req,res,next)=>{
  query={}

  if(req.body.city){
<<<<<<< HEAD
    query.city = req.body.city;
=======
    query['city'] = req.body.city;
>>>>>>> dcb42e554c9070502527a977782dfae6669adeef
  }
  if(req.body.typeOfJob){
    query.typeOfJob=req.body.typeOfJob
  }
 


  if(req.body.key){
    query.position=req.body.key;
    query = { ...query, position: { $regex: req.body.key, $options: "i" } };
  }
  if(req.body.key2){
    query.name=req.body.key2;
    query['user.username'] = {
      $regex: req.body.key2,
      $options: 'i'
    };  }
  Job.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'company',
        foreignField: '_id',
        as: 'company'
      }
    },
    {
      $unwind: '$company'
    },
    {
      $match:query
    }
  ], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
})
.then((resp)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json(resp)
})
})

module.exports=search;


