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

// const db = mysql.createConnection({
//   user: "",
//   host: "",
//   password: "",
//   database: "",
// });

app.listen(3000, () => {
  console.log("Connected to the server!");
});
