const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.get("/api/connection", (req, res) => {
  console.log("getting message");
  res.json({ message: "Connected" });
});

// const db = mysql.createConnection({
//   user: "",
//   host: "",
//   password: "",
//   database: "",
// });

app.listen(3000, () => {
  console.log("Connected to the server!");
});
