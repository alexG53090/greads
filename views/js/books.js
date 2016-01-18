$(document).ready(function(){
  $('.update-book').hide()
  getBookData().then(function(data){
    formatData(data).then(function(books){
      printBookData(books).then(function(books){
        buttonHandler().then(function(data){
          singleBook();
        })
      })
    })
  })
})
function buttonHandler(){
  return new Promise(function(resolve, reject){
    $('.book-link').on('click', function(){
      $.get('/books/' + $(this).attr('book_id'), function(data){
        for(i=0;i<data.book_id.length;i=i+1){
          var id = data.book_id[i].id;
        }
        if($('.books-container').attr != id){
          $('.books-container').remove()
        }
        resolve(data)
      })
    })
  })
}
function singleBook(data){
  data.book_id.forEach(function(book, index, array){
    // book container
    var oneBook = document.createElement('div');
    oneBook.className = 'each-book'; // set class for each book
    // set the book id value to each book
    var value = book.id;
    oneBook.setAttribute('book_id', value)
    // book title
    var bookTitle = document.createElement('h1');
    var bookName = document.createTextNode(book.title);
    bookTitle.appendChild(bookName);
    //book authors
    var bookAuthor = document.createElement('h2');
    var bookAuthors = document.createTextNode(book.last_name)
    bookAuthor.appendChild(bookAuthors)
    // book img
    var img = $('<img id="dynamic">');
    img.attr('src', book.cover_url);
    img.appendTo('.books-single');
    // book description
    var bookDescription = document.createElement('p');
    var bookDescriptions = document.createTextNode(book.description);
    bookDescription.appendChild(bookDescriptions);
    // Delete button
    var bookDelete = document.createElement('a')
    var bookDeleteText = document.createTextNode('Delete')
    bookDelete.appendChild(bookDeleteText)
    bookDelete.setAttribute('class', 'book-delete');
    bookDelete.setAttribute('href', 'books/delete/' + book.id);
    // Edit button
    var bookEdit = document.createElement('a')
    var bookEditText = document.createTextNode('Edit')
    bookEdit.appendChild(bookEditText)
    bookEdit.setAttribute('class', 'book-edit');
    bookEdit.className = 'book-edit';
    bookEdit.setAttribute('href', '/edit');
    // link to this book
    var linkToBook = document.createElement('button')
    var linksToBook = document.createTextNode('See more')
    linkToBook.setAttribute('book_id', value)
    linkToBook.className = 'book-link';
    linkToBook.appendChild(linksToBook);
    // append elements to book
    oneBook.appendChild(bookDelete);
    oneBook.appendChild(bookEdit);
    oneBook.appendChild(bookTitle);
    oneBook.appendChild(bookAuthors);
    oneBook.appendChild(bookDescriptions);
    oneBook.appendChild(linkToBook)
    $('.books-single').append(oneBook);
  })
}
function getBookData(){
  return new Promise(function(resolve, reject){
    $.get('/getbooks', function(data){
      resolve(data)
    });
  })
};
function formatData(data){
  return new Promise(function(resolve, reject){
    var books = [];
    for(var i = 0; i < data.data.length; i = i + 1){
      var book = data.data[i];
      books.push(book)
    }
    resolve(books)
  })
};
function printBookData(books){
  return new Promise(function(resolve, reject){
    books.forEach(function(book, index, array){
      // book container
      var oneBook = document.createElement('div');
      oneBook.className = 'each-book'; // set class for each book
      // set the book id value to each book
      var value = book.id;
      oneBook.setAttribute('book_id', value)
      // book title
      var bookTitle = document.createElement('h1');
      var bookName = document.createTextNode(book.title);
      bookTitle.appendChild(bookName);
      //book authors
      var bookAuthor = document.createElement('h2');
      var bookAuthors = document.createTextNode(book.last_name)
      bookAuthor.appendChild(bookAuthors)
      // book img
      var img = $('<img id="dynamic">');
      img.attr('src', book.cover_url);
      img.appendTo('.books-container');
      // book description
      var bookDescription = document.createElement('p');
      var bookDescriptions = document.createTextNode(book.description);
      bookDescription.appendChild(bookDescriptions);
      // Delete button
      var bookDelete = document.createElement('a')
      var bookDeleteText = document.createTextNode('Delete')
      bookDelete.appendChild(bookDeleteText)
      bookDelete.setAttribute('class', 'book-delete');
      bookDelete.setAttribute('href', 'books/delete/' + book.id);
      // Edit button
      var bookEdit = document.createElement('a')
      var bookEditText = document.createTextNode('Edit')
      bookEdit.appendChild(bookEditText)
      bookEdit.setAttribute('class', 'book-edit');
      bookEdit.setAttribute('href', '/edit');
      bookEdit.className = 'book-edit';
      // link to this book
      var linkToBook = document.createElement('button')
      var linksToBook = document.createTextNode('See more')
      linkToBook.setAttribute('book_id', value)
      linkToBook.className = 'book-link';
      linkToBook.appendChild(linksToBook);
      // append elements to book
      oneBook.appendChild(bookDelete);
      oneBook.appendChild(bookEdit);
      oneBook.appendChild(bookTitle);
      oneBook.appendChild(bookAuthors);
      oneBook.appendChild(bookDescriptions);
      oneBook.appendChild(linkToBook)
      // append book to html view
      $('.books-container').append(oneBook);
    })
    resolve(books)
  });
}
