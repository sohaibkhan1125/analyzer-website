import React from 'react';
import image from './contact.png';

const Contact = () => {
  return (
    <section className='flex flex-col sm:flex-row w-full'>
        <div className='w-full sm:w-[50%]'>
            <h1 className='text-4xl font-semibold text-center mt-10'>Get in touch easily with us</h1>
            <p className='px-[21%]  mt-2'>We will happy to provide our best help to you.</p>
            <br />
            <p className='px-[21%]'>You can easily contact with us via <a className='font-semibold' href="mailto:admin@website-seo-checker.net">admin@website-seo-checker.net</a></p>
        </div>
        <div className='w-full sm:w-[50%]'>
            <img className='mt-10 w-[500px] h-[300px] rounded' src={image} alt="" />
        </div>
    </section>
  )
}

export default Contact;