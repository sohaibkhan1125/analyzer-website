import React from 'react';

const NavBar = () => {
  return (
    <nav className='flex bg-[#001f3f] text-white py-2 px-4 '>
    <p className='text-xl font-semibold whitespace-nowrap mt-1'>Website SEO Checker</p>
    
    <ul className='flex text-xl ml-[50%] gap-6 whitespace-nowrap mt-1'>
      <li>Home</li>
      <li>Blog</li>
      <li>Privacy Policy</li>
      <li>About Us</li>
    </ul>

    
    </nav>
  )
}

export default NavBar;