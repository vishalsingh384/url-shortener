import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose connected :${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDb;