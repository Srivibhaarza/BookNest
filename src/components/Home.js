import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { ref, onValue } from "firebase/database";
import './Home.css';

function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const booksRef = ref(db, 'books/');
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const booksList = [];
      for (let id in data) {
        booksList.push({ id, ...data[id] });
      }
      setBooks(booksList);
    });
  }, []);

  const filteredBooks = books.filter(book =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (book) => {
    setSelectedBook(book);
    if (book.downloadURL) { 
        window.open(book.downloadURL, '_blank'); 
    } else {
        alert("No PDF found for this book.");
    }
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome to BookNest, your cozy haven for discovering great reads!</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>
      <ul className="book-list">
        {filteredBooks.map(book => (
          <li
            key={book.id}
            className="book-item"
            onClick={() => handleBookClick(book)} 
          >
            <img src={book.coverImageUrl} alt={book.bookName} className="book-cover" />
            <h3>{book.bookName}</h3>
            <p>by {book.author}</p>
          </li>
        ))}
      </ul>

      {selectedBook && (
        <div className="book-details">
          <button onClick={handleCloseDetails}>Close</button>
          <h2 className='h2name'>{selectedBook.bookName}</h2>
          <p className='pname'>by {selectedBook.author}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
