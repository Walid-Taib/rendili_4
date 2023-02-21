var express = require('express');
var router = express.Router();
const User=require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors =require('cors')
const LocalStrategy=require('passport-local').Strategy
/* GET home page. */
router.post('/signup',cors(), (req, res, next) => {


  User.register(new User({username: req.body.username ,email:req.body.email, companyCondition:req.body.companyCondition}), 
  
    req.body.password,(err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
        

      
      passport.authenticate('local')(req, res, () => {
        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, user:req.user, status: 'You are successfully logged in!'});
    
      });

 

      


    }
  });
});

router.post('/login',cors(),  (req, res) => {



  passport.authenticate('local')(req, res, () => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, user:req.user, status: 'You are successfully logged in!'});

  });

});


router.get(('/user'),cors(), (req,res,next)=>{
  User.find()
  .then((companies)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(companies)
  },(err)=>next(err))
  .catch((err)=>next(err))
})
router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
    console.log(token)
  }
});

module.exports = router;
