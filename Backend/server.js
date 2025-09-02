import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
import passport from "passport";
import "./utils/passport.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // parse JSON
// Middleware
app.use(cors());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use(passport.initialize());
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // SSL issues ke liye options
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("Connected with Database!");
  } catch (err) {
    console.error("Failed to connect with Db", err);
  }
};

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
