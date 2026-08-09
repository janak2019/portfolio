import bcrypt from "bcryptjs";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const name = "Janak Acharya";
const email = "admin@example.com";
const password = "ChangeThisPassword123!";

try {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `INSERT INTO admin_users
    (name, email, password)
    VALUES (?, ?, ?)`,
    [name, email, hashedPassword]
  );

  console.log("Admin created successfully.");
  console.log("Admin ID:", result.insertId);
  console.log("Email:", email);

  process.exit(0);
} catch (error) {
  console.error("Failed to create admin:", error);
  process.exit(1);
}