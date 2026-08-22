import fs from "fs";
import path from "path";
import crypto from "crypto";

function getUsers() {
  const usersFile = path.join(process.cwd(), "users.json");

  if (!fs.existsSync(usersFile)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
}

function checkPassword(password, salt, savedHash) {
  const hash = crypto
    .scryptSync(password, salt, 64)
    .toString("hex");

  return hash === savedHash;
}

export default function handler(req, res) {
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

    const users = getUsers();

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordCorrect = checkPassword(
      password,
      user.salt,
      user.passwordHash
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