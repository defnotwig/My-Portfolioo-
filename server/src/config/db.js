import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("Missing MONGO_URI in environment");
  }

  try {
    // Let the MongoDB connection string define the database (works for both local and Atlas).
    const conn = await mongoose.connect(uri);

    console.log(
      `✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("❌ Mongo connection error:", error.message);
    process.exit(1);
  }
};

