const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "weiqlu",
  password: "1200Fairwater",
  database: "edugrade",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:\n", err);
    return;
  }
  console.log("Connected to Database!");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);
    const status = "user";

    db.query(
      "INSERT INTO users (username, password, status) VALUES (?, ?, ?)",
      [username, hashedPassword, status],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Username already exists" });
          }
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error hashing password:\n", error);
    res.status(500).json({ error: "server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];
      const passwordMatch = await argon2.verify(user.password, password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign(
        { username: user.username, status: user.status },
        "user-key",
        {
          expiresIn: "1h",
        }
      );

      res.json({ token, status: user.status, username: user.username });
    }
  );
});

// fetch all sections
app.get("/sections", (req, res) => {
  const query = "SELECT * FROM sections";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(result);
  });
});

// fetch sections to CRN
app.get("/sections/:crn", (req, res) => {
  const { crn } = req.params;
  const sql = "SELECT * FROM sections WHERE crn = ?";
  db.query(sql, [crn], (err, result) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "No section found with the given CRN" });
      return;
    }
    res.json(result[0]);
  });
});

// fetch reviews to CRN
app.get("/reviews/:crn", (req, res) => {
  const { crn } = req.params;
  const query = "SELECT * FROM reviews WHERE crn = ?";
  db.query(query, [crn], (err, result) => {
    if (err) {
      console.error("Error fetching reviews from database:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(result);
  });
});

// add review
app.post("/reviews", (req, res) => {
  const { crn, review, username } = req.body;
  const query = "INSERT INTO reviews (crn, review, username) VALUES (?, ?, ?)";
  db.query(query, [crn, review, username], (err, results) => {
    if (err) {
      console.error("Error inserting review into database:\n", err);
      res.status(500).send("Error inserting review");
      return;
    }
    res.status(201).json({ message: "Review submitted successfully" });
  });
});

// delete reivew
app.delete("/reviews/:username/:crn", (req, res) => {
  const { username, crn } = req.params;
  const query = "DELETE FROM reviews WHERE username = ? AND crn = ?";
  db.query(query, [username, crn], (err, results) => {
    if (err) {
      console.error("Error deleting review from database:\n", err);
      res.status(500).send("Error deleting review");
      return;
    }
    res.json({ message: "Review deleted successfully" });
  });
});

// modify review
app.put("/reviews/:username/:crn", (req, res) => {
  const { username, crn } = req.params;
  const { review } = req.body;
  const query = "UPDATE reviews SET review = ? WHERE username = ? AND crn = ?";
  db.query(query, [review, username, crn], (err, results) => {
    if (err) {
      console.error("Error updating review in database:\n", err);
      res.status(500).send("Error updating review");
      return;
    }
    res.json({ message: "Review updated successfully" });
  });
});

const port = 5000;
app.listen(5000, () => {
  console.log(`Listening on port ${port}`);
});
