// Library class
class Library {
    constructor() {
    }

    bookStack = [];

    get bookList() {
        console.log(this.bookStack);
    }

    set addBook(book) {
        this.bookStack.push(book);
    }

    set removeBook(book) {
        this.bookStack.splice(this.bookStack.indexOf(book), 1);
    }
}

// Book class, object to pass around
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get readStatus() {
        return this.read;
    }

    set readStatus(input) {
        this.read = input;
        return this.read;
    }

    get getElement() {
        const protoBook = document.createElement("div");
        const bookTitle = document.createElement("span");
        const bookAuthor = document.createElement("span");

        protoBook.classList = "book";
        bookAuthor.classList = "author";
        bookTitle.classList = "title";
        
        bookTitle.innerText = this.title;
        bookAuthor.innerText = this.author;
        protoBook.appendChild(bookTitle);
        protoBook.appendChild(bookAuthor);

        // Add read button
        const readButton = document.createElement("button");
        readButton.classList = "read";
        if (this.read == 'yes') {
            readButton.innerText = "READ";
        } else {
            readButton.innerText = "NOT READ";
        }
        protoBook.appendChild(readButton);

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.classList = "remove";
        removeButton.innerText = "REMOVE";
        protoBook.appendChild(removeButton);

        return protoBook;
    }
}

//Interacting with library from display
class LibaryDisplay extends Library {
    constructor() {
    super()
    }

    container = document.querySelector('main');

    changeReadStatus = (e) => {
        let bookDisplay = e.target.parentNode;
        let book = this.bookStack[bookDisplay.dataset.index];
        if (book.readStatus === 'yes') {
            book.readStatus = 'no';
            e.target.innerText = 'NOT READ';
        } else {
            book.readStatus = 'yes';
            e.target.innerText = 'READ';
        }
    }

    removeButton = (e) => {
        let bookDisplay = e.target.parentNode;
        let book = this.bookStack[bookDisplay.dataset.index];
        this.removeBookDisplay = book;
        this.removeBook = book;
        this.updateElementIndex();  
    }

    //When a book removed from display, its data-index attribute need to be updated
    updateElementIndex = () => {
        let index = 0;
        Array.from(this.container.children).forEach(element => {
            element.dataset.index = index;
            index += 1;
        });
    }

    set addBookDisplay(book) {
        let protoBook = book.getElement;
        protoBook.setAttribute('data-index', this.bookStack.indexOf(book));
        protoBook.querySelector('.read').addEventListener('click', this.changeReadStatus);
        protoBook.querySelector('.remove').addEventListener('click', this.removeButton);
        this.container.appendChild(protoBook);
    }

    set removeBookDisplay(book) {
        let bookIndex = this.bookStack.indexOf(book);
        let removeBook = document.querySelector(`[data-index="${bookIndex}`);
        this.container.removeChild(removeBook);
    }

}

//Add book via form
class BookForm {
    constructor(){
    }

    submitFunction = (e) => {
        //Check first no input is empty
        if (this.inputTitle.value == '' || 
            this.inputAuthor.value == ''||
            this.inputPages.value == ''||
            this.inputRead.value == '') {
            alert("please fill all field");
        } else {
            let newBook = new Book (this.inputTitle.value, this.inputAuthor.value, this.inputPages.value, this.inputRead.value);
            console.log(newBook);   
            myDisplay.addBook = newBook;
            myDisplay.addBookDisplay = newBook;
            //Reset all input value to empty
            this.inputTitle.value = '';
            this.inputAuthor.value = '';
            this.inputPages.value= '';
            this.inputRead.value = '';
            // Close the form
            this.formContainer.style.display = "none";
        }

        e.preventDefault();
    };

    formContainer = document.querySelector(".form");
    formButton = document.querySelector(".addNew").addEventListener('click', () => {this.formContainer.style.display = "block";});

    submitButton = document.querySelector('form button').addEventListener('click', this.submitFunction);
    inputTitle = document.querySelector("#form-title");
    inputAuthor = document.querySelector("#form-author");
    inputPages = document.querySelector("#form-pages");
    inputRead = document.querySelector("#form-read");

}


//Initiate Display
let myDisplay = new LibaryDisplay();

let myForm = new BookForm();

// Adding sample books in class
let sample1 = new Book ('The Hobbit #1', 'Tolkienish', 1001, 'no');
let sample2 = new Book ('LOTR #1', 'Tookien', 1002, 'no');
let sample3 = new Book ('LOTR #2', 'Tolkien', 1003, 'yes');
let sample4 = new Book ('LOTR #3', 'Tolkien too', 1004, 'yes');
let sample5 = new Book ('The Hobbit #2', 'Tolkien', 1005, 'no');

myDisplay.addBook =  sample1;
myDisplay.addBook =  sample2;
myDisplay.addBook =  sample3;
myDisplay.addBook =  sample4;
myDisplay.addBook =  sample5;

myDisplay.bookStack.forEach(book => {
    myDisplay.addBookDisplay = book;
}); 