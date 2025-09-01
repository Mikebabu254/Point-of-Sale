const express = require('express');
const app = express();
const mongoose = require('mongoose');
 const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express.js is working!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});