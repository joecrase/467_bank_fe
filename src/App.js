import React from 'react';
import './App.css';
import Parts from './components/parts.js';
import Toolbar from './components/toolbar.js';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Parts />
    </div>
  );
}

export default App;
