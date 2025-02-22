import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const MONGO_DB_URI=`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${encodeURIComponent(process.env.MONGO_DB_PWD)}${process.env.MONGO_DB_CLUSTER}`;
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
