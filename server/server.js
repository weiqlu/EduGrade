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

app.listen(3000, () => {
  console.log("Connected to the server!");
});
