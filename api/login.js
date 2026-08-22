import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

function checkPassword(password, salt, savedHash) {
  const hash = crypto
    .scryptSync(password, salt, 64)
    .toString("hex");

  return hash === savedHash;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password.",
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    const normalizedEmail = email.trim().toLowerCase();

    const users = await sql`
      SELECT id, name, email, salt, password_hash
      FROM users
      WHERE email = ${normalizedEmail}
      LIMIT 1
    `;

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const user = users[0];

    const passwordCorrect = checkPassword(
      password,
      user.salt,
      user.password_hash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login.",
    });
  }
}