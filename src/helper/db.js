import mongoose from "mongoose";

let isConnected = false; // Global variable to track connection status

export const connectDb = async () => {
  if (isConnected) {
    console.log("Database already connected.");
    return;
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "TyperX-manager",
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });

    isConnected = connection.readyState === 1; // Set connection status
    console.log("✅ Database connected successfully!");
    console.log("🔗 Connected with host:", connection.host);
  } catch (error) {
    console.error("❌ Failed to connect to the database!", error);
    process.exit(1); // Exit process on failure
  }
};
