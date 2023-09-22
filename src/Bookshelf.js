import Book from './Book'

const BookShelf = ({ shelf, books, shelfChange }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(b => {
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

export default BookShelf;