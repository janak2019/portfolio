
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Admin from "../model/Admin.js";

dotenv.config();

const name = "Janak Acharya";
const email = "admin@example.com";
const password = "ChangeThisPassword123!";

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully");
    console.log("Admin ID:", admin._id);
    console.log("Email:", admin.email);

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
