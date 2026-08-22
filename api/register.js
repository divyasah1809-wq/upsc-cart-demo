import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const existingUser = await sql`
      SELECT id, name, email
      FROM users
      WHERE email = ${normalizedEmail}
      LIMIT 1
    `;

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    const salt = crypto.randomBytes(16).toString("hex");

    const passwordHash = crypto
      .scryptSync(password, salt, 64)
      .toString("hex");

    const id = Date.now().toString();

    const newUser = await sql`
      INSERT INTO users (
        id,
        name,
        email,
        salt,
        password_hash
      )
      VALUES (
        ${id},
        ${trimmedName},
        ${normalizedEmail},
        ${salt},
        ${passwordHash}
      )
      RETURNING id, name, email
    `;

    return res.status(201).json({
      message: "Account created successfully.",
      user: newUser[0],
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Server error during registration.",
    });
  }
}