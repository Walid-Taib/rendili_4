const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const Jobschema=new Schema({
    position:{
        type:String,
        required:true
    },
    typeOfJob:{
        type:String,
        required:true
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
        ref:'Company'
    }
})

const Job =mongoose.model('Job', Jobschema);
module.exports=Job;