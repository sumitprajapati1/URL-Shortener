const express=require("express");
const {connectToMongoDB} =require("./config");
const urlRoute=require("./routes/url");
const URL=require("./models/url");

const app=express();
app.use(express.json());
const PORT=8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDB connected"));
app.use("/url",urlRoute);

app.get("/:shortId",async (req,res)=>
{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId,
        },
        { 
            $push:{
                visitHistory:
                {
                    timestamp:Date.now()
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));