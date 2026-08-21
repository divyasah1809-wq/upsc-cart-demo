import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "users.json");

app.use(express.json());

// --------------------
// Users File
// --------------------

function getUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]");
  }

  return JSON.parse(
    fs.readFileSync(USERS_FILE, "utf-8")
  );
}

function saveUsers(users) {
  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify(users, null, 2)
  );
}

// --------------------
// Password Hashing
// --------------------

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .scryptSync(password, salt, 64)
    .toString("hex");

  return {
    salt,
    hash
  };
}

function checkPassword(password, salt, savedHash) {
  const hash = crypto
    .scryptSync(password, salt, 64)
    .toString("hex");

  return hash === savedHash;
}

// --------------------
// Test Backend
// --------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "UPSC Cart Backend is running"
  });
});

// --------------------
// Register
// --------------------

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields."
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters."
    });
  }

  const users = getUsers();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered."
    });
  }

  const { salt, hash } = hashPassword(password);

  const newUser = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    salt,
    passwordHash: hash
  };

  users.push(newUser);

  saveUsers(users);

  res.status(201).json({
    message: "Account created successfully.",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

// --------------------
// Login
// --------------------

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password."
    });
  }

  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password."
    });
  }

  const passwordCorrect = checkPassword(
    password,
    user.salt,
    user.passwordHash
  );

  if (!passwordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password."
    });
  }

  res.json({
    message: "Login successful.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// --------------------
// Start Server
// --------------------

app.listen(PORT, () => {
  console.log(
    `UPSC Cart backend running at http://localhost:${PORT}`
  );
});