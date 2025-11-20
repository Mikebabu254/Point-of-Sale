const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();
const port = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express.js is working!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`${port}`);
});