import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

async function connectToMongoDB() {
    const mongoURL = process.env.MONGO_URL;
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process on failure
    }
}

export { connectToMongoDB };
