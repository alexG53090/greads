$(document).ready(function(){
  getAuthorData().then(function(data){
    formatAuthorName(data).then(function(data){
      formatAuthorInfo(data)
        console.log(data)
    })
  })
})
function getAuthorData(){
  return new Promise(function(resolve, reject){
    $.get('/authors', function(data){
      resolve(data)
    });
  })
};
function formatAuthorName(data){
  return new Promise(function(resolve, reject) {
    data.authors.forEach(function(author, index, array){
      // author container
      var oneAuthor = document.createElement('div')
      oneAuthor.className = 'each-author'; // set class for each book
      // set the book id value to each book
      var authID = author.id;
      oneAuthor.setAttribute('author_id', authID)
      // first name
      var first = document.createElement('h1')
      var firstName = document.createTextNode(author.first_name)
      first.appendChild(firstName)
      // last name
      var last = document.createElement('h2');
      var lastName = document.createTextNode(author.last_name)
      last.appendChild(lastName)
      // biography
      var bio = document.createElement('p');
      var biography = document.createTextNode(author.biography);
      bio.appendChild(biography);
      //portrait URL
      var img = $('<img id="dynamic">');
      img.attr('src', author.portrait_url);
      img.appendTo('.authors-container');
      // Delete button
      var authDelete = document.createElement('a')
      var authDeleteText = document.createTextNode('Delete')
      authDelete.appendChild(authDeleteText)
      authDelete.setAttribute('class', 'auth-delete');
      authDelete.setAttribute('href', 'authors/delete/' + author.id);
      // Edit button
      var authEdit = document.createElement('a')
      var authEditText = document.createTextNode('Edit')
      authEdit.appendChild(authEditText)
      authEdit.setAttribute('class', 'auth-edit');
      authEdit.setAttribute('href', 'authors/edit/' + author.id);
      // append errthang
      oneAuthor.appendChild(first)
      oneAuthor.appendChild(last)
      oneAuthor.appendChild(bio)
      oneAuthor.appendChild(authEdit)
      oneAuthor.appendChild(authDelete)
      //append to screen
      $('.authors-container').append(oneAuthor);
    })
    resolve(data)
  });
}
function formatAuthorInfo(data){
  console.log('you made it :)')
}
