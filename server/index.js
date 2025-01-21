import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import projRoutes from "./routes/projRoutes.js";
import { mongoConnect } from "./config.js";
const app = express();
app.use(
  cors({
    // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: "Content-Type",
    credentials: true
  })
);

app.use(express.json()); 
app.use(cookieParser());

app.use("/home", projRoutes);

mongoConnect();
