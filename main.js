const book_popup = document.querySelector(".add_book_popup");
const book_popup_close = document.querySelector("book_form_close");
const bookForm = document.getElementById("bookForm");
const bookFormElements = bookForm.elements;

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submitting");
  console.log(bookFormElements["b-title"].value);

  const book = new Book({
    title: bookFormElements["b-title"].value,
    author: bookFormElements["b-title"].value,
    pages: bookFormElements["b-title"].value,
    read: bookFormElements["b-title"].value
  });
  myLibrary.push(book);
  console.log(myLibrary);
});

let myLibrary = [];

function Book({title, author, pages, read}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  book_popup.classList.remove("book_popup_hidden");
}

function closeBookPopup() {
  book_popup.classList.add("book_popup_hidden");
}
