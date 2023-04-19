//Get necessary HTML elements
let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");
let nameText = document.getElementById("nameText");
let genreText = document.getElementById("genreText");
let dateText = document.getElementById("dateText");
let authorText = document.getElementById("authorText");

//Event listener for getData button
getData.addEventListener('click', async event => {

    //Send get request to receive book data, print the book data to the console.
    const response = await fetch('http://127.0.0.1:4000/books',{
    method: 'GET',
    headers: {'content-type':'application/json'},
    });
    const responseData = await response.json();

    document.getElementById("showBooks").innerHTML = responseData.map(b => b.name).join('<br/>')
    console.log(responseData);

  
    
});

//EventListener for DELETE button
deleteData.addEventListener('click', async event => {
   
    //Getting the bookdata from input
    const name = nameText.value
    var genre = genreText.value
    var date = dateText.value
    var author = authorText.value

    //Object contains bookdata
    const bookData = {
        name: name,
        genre: genre,
        date: date,
        author: author
    } 

    //Sends delete request and prints response and book data to the console.
    const response = await fetch('http://127.0.0.1:4000/books/'+name, 
    {
     method: 'DELETE',
     headers: {'content-type':'application/json'}, 
    });
    const responseData = await response.json();

    console.log(responseData);
    

    console.log(name,genre,date,author)
 
});

//EventListener for Add button.
addData.addEventListener('click', async event => {

    //Data from input fields
    const name = nameText.value
    var genre = genreText.value
    var date = dateText.value
    var author = authorText.value
 
    //Object that contains book data
    const bookData = {
        name: name,
        genre: genre,
        date: date,
        author: author
    } 
    
    //Send request to add the book and print bookdata as well as responseData.
    console.log(JSON.stringify(bookData))
    try {
        const response = await fetch('http://127.0.0.1:4000/books', 
        {
          method: 'POST',
          headers: {'content-type':'application/json'}, 
          body: JSON.stringify(bookData)
        });
   
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
  
   
    
    console.log(name,genre,date,author)
     
});
