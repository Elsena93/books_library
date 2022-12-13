let myLibrary = [];
const rack = document.querySelector("main");

// Book constructor
function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype function
Book.prototype.showInfo = function () {
    let info = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, me ' + this.read + ' read';
    return info;
}

// Function to add new book to library
function addBook (title, author, pages, read) {
    let newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook);
}
    
// Function to show one book to display
function displayBook (book) {
    const protoBook = document.createElement("div");
    const bookTitle = document.createElement("span");
    const bookAuthor = document.createElement("span");
    let bookIndex = myLibrary.indexOf(book);

    protoBook.classList = "book";
    protoBook.setAttribute('data-key', bookIndex);
    bookAuthor.classList = "author";
    bookTitle.classList = "title";

    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    protoBook.appendChild(bookTitle);
    protoBook.appendChild(bookAuthor);

    // Add read button
    const readButton = document.createElement("button");
    readButton.classList = "read";
    if (book.read == 'yes') {
        readButton.innerText = "READ";
    } else {
        readButton.innerText = "NOT READ";
    }
    // Event Listener for read button
    readButton.addEventListener("click", function () {
        changeRead(book);
        readDisplay(bookIndex);
    });

    // Add remove button
    const removeButton = document.createElement("button");
    removeButton.classList = "remove";
    removeButton.innerText = "REMOVE";
    // Event Listener for remove button
    removeButton.addEventListener("click", function () {
        hideBook(bookIndex);
        removeBook(bookIndex);
    });

    protoBook.appendChild(readButton);
    protoBook.appendChild(removeButton);
    rack.appendChild(protoBook);
}

// Function to change read status in library, it comes first before changing diplay
function changeRead (book) {
    if (book.read == 'yes') {
        book.read = 'no';
    } else {
        book.read = 'yes';
    }
}

// Function to change read status in diplay
function readDisplay (bookIndex) {
    const displayBook = document.querySelector(`div[data-key="${bookIndex}"] .read`);
    if (myLibrary[bookIndex].read == 'yes') {
        displayBook.innerText = "READ";
    } else {
        displayBook.innerText = "NOT READ";
    }
}

// Function to remove one book from display, it comes first before changing diplay
function hideBook (bookIndex) { 
    const hidBook = document.querySelector(`div[data-key="${bookIndex}"]`);
    rack.removeChild(hidBook);
}

// Function to remove book from library
function removeBook (bookIndex) {
    myLibrary.splice(bookIndex, 1);
}

// Function to show form with button
const formContainer = document.querySelector(".form");
const formButton = document.querySelector(".addNew");

formButton.addEventListener("click", function() {
    formContainer.style.display = "block";
})

// Function of submit on form
const submitButton = document.querySelector("form button");
const inputTitle = document.querySelector("#form-title");
const inputAuthor = document.querySelector("#form-author");
const inputPages = document.querySelector("#form-pages");
const inputRead = document.querySelector("#form-read");

submitButton.addEventListener("click", function (e) {
    //Check first no input is empty
    if (inputTitle.value == '' || 
        inputAuthor.value == ''||
        inputPages.value == ''||
        inputRead.value == '') {
    alert("please fill all field");
    } else {
        addBook(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value);
        displayBook(myLibrary[myLibrary.length-1]);
        //Reset all input value to empty
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPages.value= '';
        inputRead.value = '';
        // Close the form
        formContainer.style.display = "none";
    }

    e.preventDefault();
})

// Adding sample books

let sample1 = new Book ('The Hobbit #1', 'Tolkienish', 1001, 'no');
let sample2 = new Book ('LOTR #1', 'Tookien', 1002, 'no');
let sample3 = new Book ('LOTR #2', 'Tolkien', 1003, 'yes');
let sample4 = new Book ('LOTR #3', 'Tolkien too', 1004, 'yes');
let sample5 = new Book ('The Hobbit #2', 'Tolkien', 1005, 'no');

myLibrary.push(sample1);
myLibrary.push(sample2);
myLibrary.push(sample3);
myLibrary.push(sample4);
myLibrary.push(sample5);

myLibrary.forEach(element => {
    displayBook(element);
});