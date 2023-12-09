import React from 'react';
import SeoChecker from './components/SeoChecker';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import DaPaChecker from './components/DaPaChecker';
// import DomainAgeChecker from './components/DomainAgeChecker';


function App() {
 
  return (
    <div className='overflow-hidden'>
    
      
    <NavBar />
    <SeoChecker />
   <Footer />
 
    </div>
  );
}

export default App;
