book_popup = document.querySelector('.add_book_popup');
book_popup_close = document.querySelector('book_form_close');

let myLibrary = [];

function Book(title,author,pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(){
  book_popup.classList.remove("book_popup_hidden");
}

function closeBookPopup() {
  book_popup.classList.add("book_popup_hidden");
}