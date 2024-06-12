const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

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

app.get("/sections", (req, res) => {
  const sql = "SELECT * FROM sections";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(result);
  });
});

app.get("/reviews", (req, res) => {
  
})

app.post("/reviews", (req, res) => {
  const { crn, review } = req.body;
  const query = "INSERT INTO reviews (crn, review) VALUES (?, ?)";
  db.query(query, [crn, review], (err, results) => {
    if (err) {
      console.error("Error inserting review into database:\n", err);
      res.status(500).send("Error inserting review");
      return;
    }
    const insertedId = results.insertId;
    const newReview = { id: insertedId, crn, review };
    res.status(201).json(newReview);
  });
});

app.get("/reviews/:crn", (req, res) => {
  const { crn } = req.params;
  const query = "SELECT * FROM reviews WHERE crn = ?";
  db.query(query, [crn], (err, results) => {
    if (err) {
      console.error("Error fetching reviews from database:\n", err);
      res.status(500).send("Error fetching reviews");
      return;
    }
    res.json(results);
  });
});

app.delete("/reviews/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM reviews WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting review from database:\n", err);
      res.status(500).send("Error deleting review");
      return;
    }
    res.send("Review deleted successfully");
  });
});

app.put("/reviews/:id", (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const query = "UPDATE reviews SET review = ? WHERE id = ?";
  db.query(query, [review, id], (err, results) => {
    if (err) {
      console.error("Error updating review in database:\n", err);
      res.status(500).send("Error updating review");
      return;
    }
    res.send("Review updated successfully");
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
