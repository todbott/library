import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAll, update, search }   from './BooksAPI';
import Book from "./Book";

const SearchPage = () => {

    const [userInput, setUserInput] = useState("");
    const [myBooks, setMyBooks] = useState([])
    const [showingBooks, setShowingBooks] = useState([])

    useEffect(() => {
        getAll().then((response) => {
                setMyBooks(response)
            }
        );
        
    }, [])

    const shelfChange = async (shelf, book) => {
        await update(book, shelf);
        let allMyBooks = await getAll();
        setMyBooks(allMyBooks);
        }

    const setInput = async (event) => {
        // Put user input into the state
        setUserInput(event.target.value);
        if (event.target.value.length === 0) {
            setShowingBooks([])
            return
        }

        // Get all books that exist (all MY books are in the myBooks state)
        let allBooks = await search(event.target.value);
        if (allBooks.hasOwnProperty('error')) {
            return
        }

        let reShelved = [];
        Object.entries(myBooks).forEach(([key, value]) => {
        
        allBooks.forEach((b) => {
                if (b.title === value['title']) {
                b.shelf = value['shelf']
                reShelved.push(b)
                }      
            })
        })
        allBooks.forEach(b=> {
            !(reShelved.indexOf(b) >= 0) && reShelved.push(b)
        })
        setShowingBooks(reShelved)
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
                (showingBooks.length > 0) && (
                    showingBooks.map(b => {
                    return (
                        <li key={b.id}>
                            <Book book={b} shelfChange={shelfChange} />
                        </li>
                    )
                })
                )
            }
        </ol>
        </div>
    </div>
    )
}

export default SearchPage;