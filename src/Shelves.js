import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import BookShelf from "./Bookshelf";
import SearchPage from './SearchPage';

const Shelves = () => {

    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf />
            <BookShelf />
            <BookShelf />
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