import express from "express";
import { connectToMongoDB } from "./config.js";
import urlRoute from "./routes/url.js";
import path from "path";
import staticRoute from "./routes/staticRouter.js";
import URL from "./models/url.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );
        if (!entry) {
            return res.status(404).send("URL not found");
        }
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error handling URL redirect:", error);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
