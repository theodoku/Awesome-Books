const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const errorMsg = document.querySelector('.error');
const addBtn = document.querySelector('#add-book');
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
      const booksList = document.querySelector('#book-list');
      booksList.appendChild(newBook);
      // Delete Selected Book
      const removeBtn = document.querySelectorAll('.remove-btn');
      removeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          const booksList = document.querySelectorAll('#book-list div');
          booksList.forEach((theBook) => {
            //   Remove Book From Display
            if (theBook.id === btn.classList[1]) {
              theBook.remove();
            }
            // Remove Book From Local Storage and Store Remaining Using Filter.
            const books = JSON.parse(localStorage.getItem('books'));
            localStorage.removeItem('books');
            const remainingBooks = books.filter((theBook) => {
              if (theBook.id !== JSON.parse(btn.classList[1])) {
                return true;
              }
              return false;
            });
            if (remainingBooks.length > 0) {
              localStorage.setItem('books', JSON.stringify(remainingBooks));
            }
          });
        });
      });
    };
}
// Add A New Book
addBtn.addEventListener('click', (event) => {
  event.preventDefault();
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
const navBtn = document.querySelectorAll('.nav_bar a');
const section = document.querySelectorAll('section');
navBtn[0].addEventListener('click', () => {
  section[0].style.display = 'flex';
  section[1].style.display = 'none';
  section[2].style.display = 'none';
  navBtn[0].classList.add('green');
  navBtn[1].classList.remove('green');
  navBtn[2].classList.remove('green');
});
navBtn[1].addEventListener('click', () => {
  section[0].style.display = 'none';
  section[1].style.display = 'flex';
  section[2].style.display = 'none';
  navBtn[0].classList.remove('green');
  navBtn[1].classList.add('green');
  navBtn[2].classList.remove('green');
});
navBtn[2].addEventListener('click', () => {
  section[0].style.display = 'none';
  section[1].style.display = 'none';
  section[2].style.display = 'flex';
  navBtn[0].classList.remove('green');
  navBtn[1].classList.remove('green');
  navBtn[2].classList.add('green');
});
// Date & Time Display function
const refreshTime = () => {
  const timeDisplay = document.getElementById('date');
  const currentDate = new Date();
  const options = {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  const dateString = currentDate.toLocaleString('en-US', options);
  timeDisplay.textContent = dateString;
  setInterval(refreshTime, 1000);
};
window.addEventListener('DOMContentLoaded', () => {
// On Page Load, Display Books From Local Storage.
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    books.forEach((book) => {
      const theBook = new Book(book.title, book.author, book.id);
      theBook.displayBooks();
    });
  }
  // On Page Load, Hide Section.
  section[1].style.display = 'none';
  section[2].style.display = 'none';
  // On Page Load, dispaly Time & Date.
  refreshTime();
});