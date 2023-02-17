var express = require('express');
var router = express.Router();
const User=require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const Company=require('../models/company');
const cors =require('cors')
const LocalStrategy=require('passport-local').Strategy
/* GET home page. */
router.post('/signup',cors(), (req, res, next) => {
  let Model , Strategy ;
  if(req.body.company){
    Strategy=new LocalStrategy(Company.authenticate())
    Model=Company
  }
  else{
    Strategy=new LocalStrategy(User.authenticate())
    Model=User;
  }
passport.use(Strategy);
passport.serializeUser(Model.serializeUser());
passport.deserializeUser(Model.deserializeUser());
  Model.register(new Model({username: req.body.username ,email:req.body.email}), 
  
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
        res.json({success: true, token: token, status: 'You are successfully logged in!'});
    
      });

 

      


    }
  });
});

router.post('/login',cors(),  (req, res) => {
  let Model , Strategy ;
  if(req.body.company){
    Strategy=new LocalStrategy(Company.authenticate())
    Model=Company
  }
  else{
    Strategy=new LocalStrategy(User.authenticate())
    Model=User;
  }
passport.use(Strategy);
passport.serializeUser(Model.serializeUser());
passport.deserializeUser(Model.deserializeUser());

  passport.authenticate('local')(req, res, () => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});

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
