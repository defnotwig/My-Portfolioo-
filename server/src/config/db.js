import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("Missing MONGO_URI in environment");
  }

  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    // Serverless-friendly connection options
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
    });

    console.log(
      `✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
    
    return conn;
  } catch (error) {
    console.error("❌ Mongo connection error:", error.message);
    console.error("Full error:", error);
    throw error; // Don't exit in serverless, throw instead
  }
};

