import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getAll, update, search }   from './BooksAPI';
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
        let updateResult = await update(book, shelf);
        let allMyBooks = await getAll();
        setMyBooks(allMyBooks);
        }

    const setInput = async (event) => {
        // Put user input into the state
        setUserInput(event.target.value);

        // Get all books that exist (all MY books are in the myBooks state)
        let allBooks = await search(event.target.value);

        console.log(allBooks)
        if (event.target.value.length === 0) {
            setShowingBooks([])
        } else {
            let reShelved = [];
            Object.entries(myBooks).forEach(([key, value]) => {
      
            let title = value['title']
            let shelf = value['shelf']
            console.log(title)
            console.log(shelf)
          
            allBooks.map((b) => {
                  if (b.title === title) {
                    b.shelf = shelf
                    console.log("chagned the shelf of " + b.title + " from " + b.shelf + " to " + shelf);
                    reShelved.push(b)
                  } else {
                    reShelved.push(b)
                  }
            
                })
            
        })
        console.log(reShelved)
        setShowingBooks(reShelved)
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