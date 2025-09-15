const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'syedumer', 
  database: 'smart_furniture_store'
});

// Signup Route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 8);
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed],
    (err, result) => {
      if (err) return res.status(400).json({ error: 'User already exists' });
      res.json({ message: 'User created successfully' });
    }
  );
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, name: user.name });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
