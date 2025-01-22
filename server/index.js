import mongoose from "mongoose";
import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import { mongoURL ,port } from "./config.js";
const router = express.Router();

const app = express();
app.use(
  cors({
    // origin: "http://localhost:7000",
    // methods: ["GET", "POST", "PUT", "DELETE"],
      // allowedHeaders: "Content-Type",
    credentials: true
  })
);

app.use(express.json()); 
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('base page');
});
app.use("/api/auth", authRouter);

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("\n--- MongoDB connected ---");
    app.listen(port, () => {
      console.log(`--- Server running on port ${port} ---`);
    });
  } catch (err) {
    console.error("--- MongoDB connection error ---", err);
  }
};


mongoConnect();
