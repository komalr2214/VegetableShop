const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // Adjust this if your frontend is on a different port
    credentials: true,
  })
);
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure random secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Use `true` only if HTTPS is enabled
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Replace with your MySQL host
  user: process.env.DB_USER, // Replace with your MySQL username
  password: process.env.DB_PASSWORD, // Replace with your MySQL password
  database:  process.env.DB_NAME, // Replace with your database name
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

//Show error if remove this POST http://localhost:5000/api/register net::ERR_CONNECTION_REFUSED
// LoginPage.js:125 Error during signup: TypeError: Failed to fetch
// at handleSubmit1 (LoginPage.js:109:1)

app.get('/', (req, res) => {
  res.send('Welcome to the server! The backend is running.');
});
 
// Register API
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Check if email already exists
  const [existingUser ] = await db
    .promise()
    .query('SELECT * FROM users WHERE email = ?', [email]);

  if (existingUser .length > 0) {
    return res.status(400).send({ message: 'Email already registered' });
  }

  // Hash password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  await db
    .promise()
    .query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      hashedPassword,
    ]);

  res.status(201).send({
    message: 'User  registered successfully',
    user: { username, email },
  });
});

// Login API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  // Check if user exists
  const [user] = await db
    .promise()
    .query('SELECT * FROM users WHERE email = ?', [email]);

  if (user.length === 0) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  // Store user info in session (optional)
  req.session.user = { username: user[0].username, email: user[0].email };

  res.status(200).send({
    message: 'Login successful',
    user: { username: user[0].username, email: user[0].email },
  });
});

// Logout API (optional)
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: 'Logout failed' });
    }
    res.status(200).send({ message: 'Logout successful' });
  });
});

//Vegetables List
// Fetch vegetables by category
app.get('/api/vegetables', (req, res) => {
  const category = req.query.category; // Retrieve category from query
  console.log('Category:', category); // Log category for debugging

  const query = category
    ? 'SELECT * FROM vegetables WHERE category = ?'
    : 'SELECT * FROM vegetables';

const params = category ? [category] : [];
db.query(query, params, (err, results) => {
    if (err) {
        console.error('Database query error:', err);
        return res.status(500).send({ message: 'Error fetching vegetables' });
    }
    res.status(200).send(results);
});

});


// Cart API
app.post('/api/cart', (req, res) => {
  const cartItems = req.body.cartItems;
  if (!cartItems) {
    return res.status(400).send({ message: 'No cart items provided' });
  }
  req.session.cartItems = cartItems; // Store in session
  res.status(200).send({ message: 'Cart items saved successfully' });
});

app.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);


