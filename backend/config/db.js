import mongoose from "mongoose";

// MongoDB connection with error handling and detailed logging
const connectDB = async () => {
  try {
    // Connect to MongoDB using environment variable
    // MONGO_URI should be in format: mongodb+srv://username:password@cluster.mongodb.net/databasename
    const mongoURI = process.env.MONGO_URI;

    // Check if URI is set
    if (!mongoURI) {
      throw new Error("MONGO_URI not found. Please set it in your .env file");
    }

    // Connect with options
    await mongoose.connect(mongoURI);
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    // Exit process with error code if can't connect to database
    process.exit(1);
  }
};

export default connectDB;
