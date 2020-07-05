import React from 'react';
import './App.css';
import Topbar from './components/topbar/topbar.js'
import Selection from './components/selection-box/selection.js'
function App() {
  return (
    <div className="App">
      <Topbar></Topbar>
      <Selection></Selection>
    </div>
  );
}

export default App;
