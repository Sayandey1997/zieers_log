require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL");
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], err => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(201).json({ message: "User registered successfully!" });
    });
});

app.post('/login', async (req, res) => {
    db.query("SELECT * FROM users WHERE email = ?", [req.body.email], async (err, result) => {
        if (err || !result.length || !await bcrypt.compare(req.body.password, result[0].password))
            return res.status(401).json({ message: "Invalid credentials" });
        res.status(200).json({ message: "Login successful" });
    });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

