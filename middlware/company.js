exports.verifyCompany=(req,res,next)=>{
    if(req.user.company){
        next()
    }
    else{
        err=new Error('You are not allowed');
        err.statusCode=404;
        next(err);
        return
    }
}