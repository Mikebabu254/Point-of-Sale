const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();
const port = process.env.PORT;
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  }else{
    console.log('Connected to the database');
    connection.release();
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`${port}`);
});