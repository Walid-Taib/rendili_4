var express = require('express');
var router = express.Router();
const User=require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const Company=require('../models/company');
const cors =require('cors')
/* GET home page. */
router.post("/signup",cors(), function(req, res) {
  User.register({ username: req.body.username, email: req.body.email }, req.body.password, function(err, user) {
    if (err) {
      return res.render("signup", { error: err.message });
    }

    passport.authenticate("local")(req, res, function() {
      res.statusCode=200;
      res.setHeader('Content-Type','application/json')
    });
  });
});
router.post("/login",cors(), function(req, res) {
  const user = User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }]
  }, function(err, user) {
    if (!user) {
      return res.render("login", { error: "Invalid credentials" });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, token: token,user:req.user, status: 'You are successfully logged in!'});    });
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

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
