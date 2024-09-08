const express=require("express");
const {connectToMongoDB} =require("./config");
const urlRoute=require("./routes/url");

const app=express();
const PORT=8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDB connected"));
app.use("/url",urlRoute);

app.listen(port,()=>console.log(`Server started at PORT: ${PORT}`));