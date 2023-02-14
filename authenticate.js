var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var FacebookTokenStrategy = require('passport-facebook-token');

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




    exports.verifyUserWithToken=(token, secretKey) =>{
        try {
          // Extract the token from the "Bearer" header
          const tokenParts = token.split(' ');
          const tokenValue = tokenParts[1];
      
          // Verify the token using the secret key
          const decodedToken = jwt.verify(tokenValue, secretKey);
      
          // Extract the user ID from the decoded token
          const userId = decodedToken.user_id;
      
          // Check if the user with the given ID exists in the database
          if (!userExistsInDatabase(userId)) {
            throw new Error('User does not exist');
          }
      
          // Return the verified user
          return getUserById(userId);
        } catch (error) {
          // Handle any errors that occur during the verification process
          console.error(`Error verifying user with token: ${error}`);
          return null;
        }
      }
      
    

exports.verifyAdmin=(req,res,next)=>{
    if(req.user.admin){
        next()
    }
    else{
        err=new Error('You are not allowed');
        err.statusCode=404;
        next(err);
        return
    }
}


exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));


// Use passport to handle sessions
;








