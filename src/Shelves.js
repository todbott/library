import { Link } from 'react-router-dom';
import BookShelf from "./Bookshelf";
import SearchPage from './SearchPage';
import { getAll, update}   from './BooksAPI';
import { useState, useEffect } from 'react';

const Shelves = () => {

    const [currentlyReading, setCurrentlyReading] = useState([])
    const [wantToRead, setWantToRead] = useState([])
    const [read, setRead] = useState([])

    const shelfChange = async (shelf, book) => {
        await update(book, shelf);
        let allBooks = await getAll();
        setCurrentlyReading(allBooks.filter(b => b.shelf === "currentlyReading"))
        setWantToRead(allBooks.filter(b => b.shelf === "wantToRead"))
        setRead(allBooks.filter(b => b.shelf === "read"))
        }
    

    useEffect(() => {
        getAll().then((response) => {
            setCurrentlyReading(response.filter(b => b.shelf === "currentlyReading"))
            setWantToRead(response.filter(b => b.shelf === "wantToRead"))
            setRead(response.filter(b => b.shelf === "read"))
            }
            
        );
        
    }, [])

    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelf="Currently Reading" books={currentlyReading} shelfChange={shelfChange} />
            <BookShelf shelf="Want to Read" books={wantToRead} shelfChange={shelfChange} />
            <BookShelf shelf="Read" books={read} shelfChange={shelfChange} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" element={<SearchPage />}>
            Add a book
          </Link>
        </div>
      </div>
    )
}

export default Shelves;