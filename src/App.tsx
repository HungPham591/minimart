import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './containers/Client';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
