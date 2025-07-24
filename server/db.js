// db.js
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const DB_URI = 'mongodb+srv://admin:1234@cluster0.aflyulp.mongodb.net/Podcast'

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
