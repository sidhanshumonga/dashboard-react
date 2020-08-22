import React from 'react';
import './App.css';
import Header from './components/header/header.js'
import Footer from './components/footer/footer.js'
import BottomFooter from './components/footer/bottom-footer.js'
import Cards from './components/cards/cards.js'
import Selection from './components/selection-box/selection.js'
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Selection></Selection>
      <Cards></Cards>
      <Footer></Footer>
      <BottomFooter />
    </div>
  );
}

export default App;
