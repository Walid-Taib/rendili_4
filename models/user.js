const mongoose=require('mongoose');
const Schema=mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    email:   {
        type: String,
        required:true
    },
    facebookId: String,

});

UserSchema.plugin(passportLocalMongoose);
const User=mongoose.model('User',UserSchema);
module.exports=User;