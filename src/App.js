import React from 'react';
import './App.css';
import Header from './components/header/header.js'
import Footer from './components/footer/footer.js'
import BottomFooter from './components/footer/bottom-footer.js'
import InfoPanel from './components/infopanel/infopanel.js'
import Selection from './components/selection-box/selection.js'
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Selection></Selection>
      <InfoPanel></InfoPanel>
      <Footer></Footer>
      <BottomFooter />
    </div>
  );
}

export default App;
