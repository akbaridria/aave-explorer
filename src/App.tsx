import React from 'react';
import './App.css';
import { Navbar } from './features/navbar/Navbar'
import { Home } from './pages/Home'
import { Txhash } from './pages/Txhash';
import { Routes, Route } from "react-router-dom";
import { isMobile } from 'react-device-detect';

function App() {
  return (
    <>
      {
        isMobile ? <div>Sorry, currently only supported desktop browser!</div> : (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="txhash/:id" element={<Txhash />} />
            </Routes>
          </div>
        )
      }

    </>

  );
}

export default App;
