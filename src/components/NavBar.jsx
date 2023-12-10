import React from 'react';


const NavBar = () => {
  return (
    <nav className='flex bg-[#001f3f] text-white py-2  w-full'>
      <div className='text-center w-full sm:w-[30%]'>
    <p className='text-xl font-semibold whitespace-nowrap mt-1 px-5 '>Website SEO Checker</p>
    </div>
    <div className='hidden sm:block ml-[50%] w-0 sm:w-[70%]'>
    <ul className='flex text-xl  gap-6 whitespace-nowrap mt-1'>
      <li>Home</li>
      <li>Blog</li>
      <li>Privacy Policy</li>
      <li>About Us</li>
    </ul>
    </div>
    
    </nav>



  )
}

export default NavBar;