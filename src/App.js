import "./App.css";
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import BookShelf from "./Bookshelf";
import Shelves from "./Shelves";
import SearchPage from "./SearchPage";
import { useState } from "react";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    
    <div className="app">
    <Routes>
      <Route exact path="/" element={<Shelves />} />
      <Route path="/search" element={<SearchPage />}/>
    </Routes>
    </div>
  );
}

export default App;
