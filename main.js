const book_popup = document.querySelector(".add_book_popup");
const book_popup_close = document.querySelector("book_form_close");
const bookForm = document.getElementById("bookForm");
const bookFormElements = bookForm.elements;
const libraryDiv = document.getElementById("library");

let myLibrary = [];

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

  // get the index of the item we just added to library array and assign it as dataId
  let newIndex = myLibrary.indexOf(book);
  myLibrary[newIndex].dataId = newIndex;

  displayLibrary();
});

function Book({ title, author, pages, read }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibraryPopup() {
  book_popup.classList.remove("book_popup_hidden");
}

function deleteBook(book) {
  //receives the book object and then filters the existing library array
  filteredLibrary = myLibrary.filter((el) => el.dataId !== book.dataId);
  myLibrary = filteredLibrary;
  displayLibrary();
}

function closeBookPopup() {
  book_popup.classList.add("book_popup_hidden");
}

function displayLibrary() {
  // clear existing node
  function empty(element) {
    while (element.firstElementChild) {
      element.firstElementChild.remove();
    }
  }
  empty(libraryDiv);

  myLibrary.map((book) => {
    const hasRead = book.read ? "Yes" : "Not yet";

    const newCardDiv = document.createElement("div");
    newCardDiv.className = "card";    

    const newContainerDiv = document.createElement("div");
    newContainerDiv.className = "container";

    const newCardClose = document.createElement("button");
    newCardClose.className = "buttonClose";
    newCardClose.textContent = "X";
    newCardClose.onclick = () => {
      deleteBook(book);
    };
    newContainerDiv.appendChild(newCardClose);

    const newTitle = document.createElement("h4");
    newTitle.textContent = book.title;

    const newAuthor = document.createElement("p");
    newAuthor.textContent = book.author;

    const newPages = document.createElement("p");
    newPages.textContent = `${book.pages} pages`;

    const newHasRead = document.createElement("p");
    newHasRead.textContent = `Has been read: ${hasRead}`;

    newContainerDiv.appendChild(newTitle);
    newContainerDiv.appendChild(newAuthor);
    newContainerDiv.appendChild(newPages);
    newContainerDiv.appendChild(newHasRead);

    newCardDiv.appendChild(newContainerDiv);

    libraryDiv.appendChild(newCardDiv);
  });
}
