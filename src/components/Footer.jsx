import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-[#003366] text-white h-[50px] mt-[19%] rounded '>
    <section className='flex sm:flex'>
     <div>
       <p className='px-2 text-2xl mt-2 font-semibold'>Website SEO Checker</p>
     </div>
     <div>
        <ul className='flex gap-3 text-xl mt-2 px-[40%]  whitespace-nowrap'> 
            <li>Home</li>
            <li>DA PA Checker</li>
            <li>Privacy Policy</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
     </div>
    </section>
    </footer>
  )
}

export default Footer;