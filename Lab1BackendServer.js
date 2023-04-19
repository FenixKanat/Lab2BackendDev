//Importing required modules: 
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const app = express();
const jsonParser = bodyParser.json();
//Import database functions.
const { getBook, getData, deleteData, addData } = require('./database.js');

//Import and enable CORS middleware.
const cors = require ('cors')
app.use(cors({
    origin: "*",
}))

app.get('/', (req, res) => {
  res.send('Server is running!');
});

//Route 1, The Welcome Route, will show
//Links will show up that are related to other routes
app.get('/Welcome', (req, res) => {
  let links =
    '<a href="http://localhost:4000/books">Click here to visit all of our books in our database</a><br>';
  links +=
    '<a href="http://localhost:4000/book/Book1">Click here to view the first book in our database</a><br>';
  links +=
    '<a href="http://localhost:4000/book/Book2">Click here to view the second book in our database</a><br>';
  links +=
    '<a href="http://localhost:4000/book/Book3">Click here to view the third book in our database</a><br>';
  links +=
    '<a href="http://localhost:4000/book/Book4">Click here to view the fourth book in our database</a><br>';
  res.send(
    'Welcome to our book store, here are some options for you :) <br> ' + links
  );
});

// Route 2, Waits for getBooks function to complete
// The result is stored in constant var "books"
// Try and catch for error handling
app.get('/books', async (req, res) => {
  try {
    const books = await getData();
    res.json(books);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Route 3, checks if the required name exists, if so, stores it in a variable with same name.
// Try and catch for error handling.
app.get('/book/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const book = await getBook(name);
    if (book) {
      res.json(book);
    } else {
      res.json({ error: 'Book Not Found' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});


// Route DELETE: Deletes a book by given name
// Deletes a book from the database based on its name and sends a success message if deleted successfully.
// If the book is not found, it sends an error message.
app.delete('/books/:name', async (req, res) => {
  try {
    const result = await deleteData(req.params.name);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route ADD: Adds a new book to the database
// Adds a new book to the database based on the req body and sends a success message if added successfully.
// Validates the req body using middleware.
// Sends error message to the client if any validation errors comes up.
app.post(
  '/books',
  jsonParser,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const result = await addData(req.body);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);
app.listen(4000, () => {
    console.log("Server listening" + 4000);
})
