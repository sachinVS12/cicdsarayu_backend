const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Mock database (in-memory for now)
const users = [];

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Hello sachintendulkar" });
});

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Username already taken" });
  }

  // Add user to mock DB
  users.push({ username, password });
  return res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Login successful", user: { username } });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
