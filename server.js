import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/url.routes.js";
import errorHandler from "./middlewares/error.js";

dotenv.config();

//express app
const app=express();
const PORT=process.env.PORT||5000;

//Middleware
app.use(express.json());

//Routes
app.use("/api/urls", router);

//middleware
app.use(errorHandler);

//Start the server
const startServer=()=>{
    try {
        //connect to db
        connectDb();
        //start and listen to the requests
        app.listen(PORT,()=>{
            console.log(`Server started listening at port: ${PORT}`);
        })
    } catch (err) {
        console.log(err.message);
    }
}

startServer();