const shortid = require("shortid");
const URL=require("../models/url");

async function handleGenerateNewShortURL(req,res){
    const shortID=shortid();
    const body=req.body;
    if(!body.url) return res.status(400).json({err:"Url is required"});
    await URL.create({
        shortID:shortID,
        redirectUrl:body.url,
        visitHistory:[],
    })
    return res.json({id:shortID});
}
module.exports={
    handleGenerateNewShortURL,
}
