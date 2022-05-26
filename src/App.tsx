import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Client from './containers/Client';

function App() {
  return (
    // <BrowserRouter basename='https://hungpham591.github.io/minimart/' >
    //   <Routes>
    //     <Route path='/*' element={<Client />} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
