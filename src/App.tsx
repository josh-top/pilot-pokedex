import React from 'react';
import Pokemon from './features/Pokemon';
import Background from './components/Background';

import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Background />
      <Navbar />
      <div className="container">
        <Pokemon />
      </div>
    </div>
  );
}

export default App;
