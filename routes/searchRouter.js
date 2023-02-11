const express=require('express');
const search=express.Router();
const bodyParser=require('body-parser');
search.use(bodyParser.json());
const Company=require('../models/company');
const cors=require('cors')
const authenticate=require('../authenticate')
search.route('/')
.post(cors(),(req,res,next)=>{
  query={}
  if(req.body.city){
    query.city=req.body.city
  }
  if(req.body.typeOfJob){
    const job=req.body.typeOfJob.split(',')
    query.typeOfJob=job 
    query = { ...query, typeOfJob: { $in: job } };  }
 

  if(req.body.key){
    query={...query,$or:[{position:{$regex:req.body.key , $options :"i"}},{name:{$regex:req.body.key , $options :"i"} }]}
  }

  Company.aggregate([{$match:query}])
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.json(resp);
  })
})
search.route('/keyword')
.post((req,res,next)=>{
  Company.find()
})

module.exports=search;


