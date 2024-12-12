const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Mock Database
let users = [{ username: "admin", password: "admin123" }];
let posts = [];
let comments = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials." });
    }
});

// Create Post
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.json({ message: "Post created successfully!" });
});

// Get Posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// Add Comment
app.post("/comments", (req, res) => {
    const { comment } = req.body;
    comments.push({ text: comment });
    res.json({ message: "Comment added successfully!" });
});

// Get Comments
app.get("/comments", (req, res) => {
    res.json(comments);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
