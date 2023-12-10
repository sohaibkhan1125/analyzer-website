import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeoChecker from './components/SeoChecker';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import DaPaChecker from './components/DaPaChecker';
import DomainAgeChecker from './components/DomainAgeChecker';
import Policy from './components/Policy';
import About from './components/About';
import Contact from './components/Contact';
import Main from './components/Main';



function App() {
  return (
    <Router>
      <div className='overflow-hidden'>
        <NavBar />
        <Routes>
          <Route path="/" element={<SeoChecker />} />
          <Route path="/da-pa-checker" element={<DaPaChecker />} />
          <Route path="/domain-age-checker" element={<DomainAgeChecker />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          
        </Routes>
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
