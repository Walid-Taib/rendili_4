const mongoose=require('mongoose');
const Schema=mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:   {
        type: Boolean,
        default:false
    },
    email: { type: String, unique: true, required: true },


    facebookId: String,

});

User.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports=mongoose.model('User',User);