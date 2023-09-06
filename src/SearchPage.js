import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getAll, update, search }   from './BooksAPI';
import Book from "./Book";

const SearchPage = () => {

    const [userInput, setUserInput] = useState("");
    const [allBooks, setAllBooks] = useState([])
    const [showingBooks, setShowingBooks] = useState([])

    useEffect(() => {
        getAll().then((response) => {
                setAllBooks(response)
            }
        );
        
    }, [])

    const shelfChange = async (shelf, book) => {
        let updateResult = await update(book, shelf);
        let allBooks = await getAll();
        setAllBooks(allBooks);
        }

    const setInput = async (event) => {
        setUserInput(event.target.value);
        let allBooks = await search(event.target.value);
        setAllBooks(allBooks);
        console.log(allBooks)
        if (event.target.value.length === 0) {
            setShowingBooks([])
        } else {
            setShowingBooks(allBooks)
        }
        
    }

    return (
        <div className="search-books">
        <div className="search-books-bar">
        <Link className="close-search" to="/">
            Close
        </Link>
        <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={userInput}
            onChange={setInput}
            />
        </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
            {
                showingBooks.map(b => {
                    return (
                        <li key={b.id}>
                            <Book book={b} shelfChange={shelfChange} />
                        </li>
                    )
                    
                })
            }
        </ol>
        </div>
    </div>
    )
}

export default SearchPage;