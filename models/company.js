const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const localpassportmongoose=require('passport-local-mongoose')
const CompanySchema =new Schema({

    email:{
        type:String,
        required:true
    }
},{timestamps:true})
CompanySchema.plugin(localpassportmongoose)
const Company=mongoose.model('Company',CompanySchema);

module.exports=Company;