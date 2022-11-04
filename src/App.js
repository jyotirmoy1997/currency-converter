import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Box from './components/box-component/box.component';
import Footer from './components/footer-component/footer.component';

const App = () => {
  return (
    <div className="App">
        <Box/>
        <Footer/>
    </div>
  );
}

export default App;
