const mongoose=require("mongoose");

const UrlSchema=new mongoose.Schema({
    ShortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
},
  {timestamps:true}
);
const URL = mongoose.model("url",UrlSchema);
module.exports=URL;