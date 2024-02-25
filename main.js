const book_popup = document.querySelector(".add_book_popup");
const book_popup_close = document.querySelector("book_form_close");
const bookForm = document.getElementById("bookForm");
const bookFormElements = bookForm.elements;

//play with this
// const fd = new FormData(event.target);
// let inputFieldData = fd.get("cityInput");

// if (inputFieldData.trim().length < 1) {
//   return;
// }

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fd = new FormData(event.target);
  let bTitle = fd.get("b-title");
  let bAuthor = fd.get("b-author");
  let bPages = fd.get("b-pages");
  let bRead = fd.get("b-read");

  const book = new Book({
    title: bTitle,
    author: bAuthor,
    pages: bPages,
    read: bRead,
  });
  myLibrary.push(book);
  console.log(myLibrary);
});

let myLibrary = [];

function Book({ title, author, pages, read }) {
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
