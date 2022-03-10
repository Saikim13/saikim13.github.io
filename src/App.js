import React from "react";
import './App.css';
import Search from './pages/search/search';
import Sobre from './pages/sobre/sobre';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  
  return( 
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="*" element={<Search />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
