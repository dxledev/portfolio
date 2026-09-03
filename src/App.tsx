// import { useState } from 'react'
// import example from './assets/example.png'
import './App.css'
import Header from './components/layout/Header.tsx';
import Body from './components/layout/Body.tsx';
import Footer from './components/layout/Footer.tsx';

function App() {
  return (
    <div className='App'>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
