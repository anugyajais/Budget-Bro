import express from "express"
import cors from "cors"
import { port, mongoURL } from "./config.js"
import mongoose from "mongoose";
const app = express();
app.use(cors({
    origin: 'https://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:'Content-Type'
}));

// app.get('/')




const mongoConnect = async () => {
    await mongoose.connect(mongoURL).then(() => {
        console.log("\n---mongo connected--")
        app.listen(port, () => {
            console.log(`---server running on port ${port}--- `)
        })
    })
};


mongoConnect();