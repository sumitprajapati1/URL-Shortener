const express=require("express");
const {connectToMongoDB} =require("./config");
const urlRoute=require("./routes/url");
const path=require("path");
const staticRoute=require("./routes/staticRouter");
const URL=require("./models/url");
const app=express();

const PORT=8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use("/url",urlRoute);

app.use("/",staticRoute);

app.get("/url/:shortId",async (req,res)=>
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