import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex flex-col sm:flex-row bg-[#001f3f] text-white py-2  h-[400px] sm:h-[43px] w-full '>
    <div className='text-center sm:-ml-10 w-full sm:w-[30%]'>
  <p className='text-xl font-semibold whitespace-nowrap mt-3 sm:mt-0  px-5 '>Website SEO Checker</p>
  </div>

  <ul className='flex flex-col sm:flex-row text-xl text-center  gap-6 whitespace-nowrap mt-10 sm:mt-0'>
    <li><Link to="/">Home</Link> </li>
    <li><Link to="/da-pa-checker">DA PA Checker</Link></li>
    <a href="/DomainAgeChecker.jsx">
    <li><Link to="/domain-age-checker">Domain Age Checker</Link></li>
    </a>
    <li> <Link to="/privacy-policy">Privacy Policy</Link> </li>
    <li><Link to="/contact">Contact</Link></li>
    <li><Link to="/about-us">About Us</Link> </li>
  </ul>
  
  
  </footer>
  )
}

export default Footer;