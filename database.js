const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

//Creating table named books with four columns and inserting data into it. 
db.serialize(() => {
  db.run('CREATE TABLE books (name TEXT, genre TEXT, date DATE, author TEXT)')

  db.run("INSERT INTO books (name, genre, date, author) VALUES ('Book1', 'Science fiction', '2020-01-01', 'Fenix Kanat'),('Book2', 'Fantasy', '2021-01-01', 'Alice Williams'),('Book3', 'True Crime', '2022-01-01', 'Edward Woo'),('Book4', 'Horror', '2023-01-01', 'Melinda Eliasson')");
})

//getData function that will allow the user to see all the books in the database
//It is made available to other JS file using module.exports.function...
module.exports.getData = function () {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM books', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

//getBook function takes book name as parameter and will return specifically required book.
//Is being available to other files through using module.exports.function
module.exports.getBook = function (name) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM books WHERE name= "${name}" limit 1`, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

//Takes name as parameter, and Deletes the given name from books.
//Simple error handling in case error occurs, otherwise if book has been deleted, sends a successfull message.
module.exports.deleteData = function (name) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM books WHERE name="${name}"`, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({message: `Book has been deleted from the database.`});
            }
        });
    });
};

//Takes book as parameter, data name, genre, date and author is assigned to the object "book". 
// Inserts these values in to the books database. 
// Sends success message if it has been inserted successfully.
module.exports.addData = function (book) {
  return new Promise((resolve, reject) => {
    console.log(book);
    const { name, genre, date, author } = book;
 
    db.run(
      `INSERT INTO books (name, genre, date, author) VALUES (?, ?, ?, ?)`,
      [name, genre, date, author],
      function (err) {
        if (err) {
          console.log(err); // Log the error to the console for debugging purposes
          reject(err);
        } else {
          resolve({message: `Book has been added to the database.`});
        }
      }
    );
  });
};

