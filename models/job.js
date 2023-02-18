const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const Jobschema=new Schema({
    position:{
        type:String,
    },
    typeOfJob:{
        type:String,
    },
    description:{
        type:String
    },
    tasks:{
        type:String
    },
    skills:{
        type:String
    },
    salary:{
        type:String
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Job =mongoose.model('Job', Jobschema);
module.exports=Job;