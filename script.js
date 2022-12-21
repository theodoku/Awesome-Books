const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const errorMsg = document.querySelector('.error');
const addBtn = document.getElementById('add-book');
class Book {
    constructor(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
    }

    // Function displayBooks
    displayBooks = (title = this.title, author = this.author, id = this.id) => {
        // Create A New Book
        const newBook = document.createElement('div');
        newBook.id = id;
        newBook.className = 'book-wrapper';
        newBook.innerHTML = `
        <div class = "book-info">
        <p>"${title}"</p>
        <p>by ${author}</p>
        </div>
        <button class="remove-btn ${id}"> Remove </button>
        `;
        const booksList = getElementById('book-list');
        booksList.appendChild(newBook);
        // Delete Selected Book
        const removeBtn = document.querySelectorAll('.remove-btn');
        removeBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const booksList = document.querySelectorAll('#book-list div');
                booksList.forEach((theBook) => {
                    if (theBook === btn.classList[1]) {
                        theBook.remove();
                    }
                    // Remove Book From Local Storage and Store Remaining Using Filter.
                    const books = JSON.parse(localStorage.getItem('books'));
                    localStorage.removeItem('books');
                    const remainingBooks = books.filter((theBook) => {
                        if (theBook.id !== JSON.parse(btn.classList[1])) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (remainingBooks > 0) {
                        localStorage.setItem('books', JSON.stringify(remainingBooks));
                    }
                });
            });
        });
    };
}
// Add A New Book
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const id = Date.now();
    if (!title && !author) {
        errorMsg.innerHTML = 'Please enter book details';
        errorMsg.classList.add('active');
    } else {
        errorMsg.classList.remove('active');
        const addNewBook = new Book(title, author, id);
        let books = localStorage.getItem('books');
        if (books === null) {
            books = [];
        } else {
            books = JSON.parse(books);
        }
        books.push(addNewBook);
        localStorage.setItem('books', JSON.stringify(books));
        bookTitle.value = '';
        bookAuthor.value = '';
        addNewBook.displayBooks(title, author, id);
    }
});
// Script For Single Page Application 

// Date & Time Display function 
const refreshTime = () => {
    const timeDisplay = getElementById('date');
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateString = currentDate.toLocaleString('en-US', options);
    timeDisplay.textContent = dateString;
    setInterval(refreshTime, 1000);
};
refreshTime();