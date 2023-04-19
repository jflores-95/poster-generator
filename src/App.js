import React from "react";
import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "../src/modules/home/home"
import Album from "../src/modules/posterPreview/posterPreview"

export default function App() {
  return (
   
 <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album" element={<Album />} />
      </Routes>
 </div>
     
  );
}
