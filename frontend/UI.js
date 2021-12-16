import BookService from './services/BookService';
const bookService = new BookService();

import { format } from 'timeago.js';

class UI {

  async renderBooks() {
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById('books-cards');
    booksCardContainer.innerHTML = '';
    books.forEach((book) => {
      const div = document.createElement('div');
      div.className = 'animated fadeInRight';
      div.innerHTML = `
      <div class="book-cards">
      <div class="book-card">
       <div class="content-wrapper">
       <img src="${book.imagePath}" alt="" class="book-card-img">
       <div class="card-content">
       <div class="book-name">${book.title}</div>
        <div class="book-by">${book.author}</div>
        
         <div class="book-sum card-sum">"${book._id}"</div>
        </div>
      </div>
      </div>
      `;
      booksCardContainer.appendChild(div);
    });
  }

  async addANewBook(book) {
    await bookService.postBook(book);
    this.renderBooks();
    this.clearBookForm();
  }

  clearBookForm() {
    document.getElementById('book-form').reset();
    document.getElementById('title').focus();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    // Creating a div
    const div = document.createElement('div');
    // Styling the div
    div.className = `message ${colorMessage}`;
    // Adding Text to the div
    div.appendChild(document.createTextNode(message));
    // Puting in the documnet
    const container = document.querySelector('.col-md-4');
    const bookForm = document.querySelector('#book-form');
    container.insertBefore(div, bookForm);
    // Removing the div after some secconds
    setTimeout(() => {
      document.querySelector('.message').remove();
    }, secondsToRemove);
  }

  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }

}

export default UI;
