const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const localpassportmongoose=require('passport-local-mongoose')
const CompanySchema =new Schema({
    city:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true

    },

    email:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    }

    


},{timestamps:true})

CompanySchema.plugin(localpassportmongoose)
const Company=mongoose.model('Company',CompanySchema);
module.exports=Company;