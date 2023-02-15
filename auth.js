var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Company = require('./models/company');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');


exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.modifyRequestBody=(req, res, next) =>{
    Company.aggregate([{$match:{$or:[{username:req.body.username},{email:req.body.username}]}}])
    .then((resp)=>{
      req.body.username=resp[0].username;
      next()
    },(err)=>next(err))
    .catch((err)=>next(Error))
    
    
    
       
    
    }

var config = require('./config.js');
passport.use(new LocalStrategy(Company.authenticate()));
passport.serializeUser(Company.serializeUser());
passport.deserializeUser(Company.deserializeUser());