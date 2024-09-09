import { mongoose } from "mongoose";
import { nanoid } from "nanoid";
const urlSchema=new mongoose.Schema(
    {
    shortId:{
        type:String,
        required:true,
        unique:true,
        default: () => nanoid(8),
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
},
  {timestamps:true}
);
const URL = mongoose.model("url",urlSchema);
export default URL;