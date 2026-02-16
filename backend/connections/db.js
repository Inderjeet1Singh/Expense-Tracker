import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/fanvoai",
    );
    console.log("Database Connected!");
  } catch (error) {
    console.log("Database Connection Error :", error);
  }
};

export default connectDb;
