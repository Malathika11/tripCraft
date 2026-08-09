require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeout: 20000
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed');
    console.error('Code:', err.code);
    console.error('Message:', err.message);
    console.error('Error:', err);
  } else {
    console.log('✅ MySQL Connected');
  }
});

module.exports = db;