const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// REGISTER USER ACCOUNTS
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Error registering user" });
    }

    const query = `INSERT INTO accounts (name, email, password, role) VALUES (?, ?, ?, ?)`;
    connection.query(query, [name, email, hash, role], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error registering user" });
      }
      res.json({ message: "User registered successfully" });
    });
  });
});

// LOGIN ACCOUNTS
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM accounts WHERE email = ?`;

  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      return res.status(500).json({ message: "Error logging in" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Account doesn't exist!" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "your_secret_key",
        { expiresIn: "1h" }
      );
      res.json({ message: "Login successful", token, role: user.role });
    });
  });
});
// To Fetch the Accounts
app.get("/accounts", (req, res) => {
  const query = "SELECT  name, email, role FROM accounts";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching accounts:", error);
      return res.status(500).json({ message: "Error fetching accounts" });
    }
    res.json(results);
  });
});
// FORGOT PASSWORD
app.post("/forgotPassword", (req, res) => {
  const { email } = req.body;
  const query = `SELECT * FROM accounts WHERE email = ?`;

  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      return res.status(500).json({ message: "Error resetting password" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    const user = results[0];
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    var resettoken = new passwordResetToken({
      _userId: user._id,
      resettoken: crypto.randomBytes(16).toString("hex"),
    });
    resettoken.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      passwordResetToken
        .find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } })
        .remove()
        .exec();
      res.status(200).json({ message: "Reset Password successfully." });
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        auth: {
          user: "user",
          pass: "password",
        },
      });
      var mailOptions = {
        to: user.email,
        from: "your email",
        subject: "Node.js Password Reset",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://localhost:4200/response-reset-password/" +
          resettoken.resettoken +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };
      transporter.sendMail(mailOptions, (err, info) => {});
    });
  });
});

// ADD BOOK
app.post("/addbook", (req, res) => {
  const { name, category, description, photo } = req.body;

  const query = `INSERT INTO books (name, category, description, photo) VALUES (?, ?, ?, ?)`;
  connection.query(
    query,
    [name, category, description, photo],
    (error, results) => {
      if (error) {
        console.error("Error adding book:", error);
        return res.status(500).json({ message: "Error adding book" });
      }
      res.json({ message: "Book added successfully" });
    }
  );
});

// FETCH ALL BOOKS
app.get("/books", (req, res) => {
  const query = `SELECT id, name, category, description FROM books`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching books:", error);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json({ books: results });
  });
});

// FETCH SINGLE BOOK BY ID
app.get("/book/:id", (req, res) => {
  const bookId = req.params.id;
  const query = `SELECT name, category, description FROM books WHERE id = ?`;

  connection.query(query, [bookId], (error, results) => {
    if (error) {
      console.error("Error fetching book:", error);
      return res.status(500).json({ message: "Error fetching book" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = results[0];
    res.json({ book });
  });
});

// EDIT BOOK
app.put("/editbook/:id", (req, res) => {
  const bookId = req.params.id;
  const { name, category, description } = req.body;

  const query = `UPDATE books SET name = ?, category = ?, description = ? WHERE id = ?`;
  connection.query(
    query,
    [name, category, description, bookId],
    (error, results) => {
      if (error) {
        console.error("Error editing book:", error);
        return res.status(500).json({ message: "Error editing book" });
      }
      res.json({ message: "Book edited successfully" });
    }
  );
});

// DELETE BOOK
app.delete("/deletebook/:id", (req, res) => {
  const bookId = req.params.id;

  const query = `DELETE FROM books WHERE id = ?`;
  connection.query(query, [bookId], (error, results) => {
    if (error) {
      console.error("Error deleting book:", error);
      return res.status(500).json({ message: "Error deleting book" });
    }
    res.json({ message: "Book deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
