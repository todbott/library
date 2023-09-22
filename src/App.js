import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Shelves from "./Shelves";
import SearchPage from "./SearchPage";

function App() {

  return (

    <div className="app">
      <Routes>
        <Route exact path="/" element={<Shelves />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
