import React, { useState } from 'react';
import axios from 'axios';

const DomainAgeChecker = () => {
    const [url, setUrl] = useState('');
    const [domainAge, setDomainAge] = useState(null);
  
    const checkDomainAge = async () => {
        try {
          const response = await axios.get('https://seo-api2.p.rapidapi.com/wordpress-theme-detector', {
            params: {
              url: url
            },
            headers: {
              'X-RapidAPI-Key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
              'X-RapidAPI-Host': 'seo-api2.p.rapidapi.com'
            }
          });
      
          console.log('API Response:', response.data);
      
          // Check if the domain age is available in the API response
          const age = response.data.body?.age;
          setDomainAge(age !== undefined ? age : 'Not available');
        } catch (error) {
          console.error('Error checking Domain Age:', error.message);
          setDomainAge('Not available');
        }
      };
      
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        checkDomainAge();
      }
    };
  
    return (
      <div>
        <div className='bg-[#003366] text-white w-[100%] border-[2px] border-[#34495e] p-5'>
          <h1 className='text-center text-3xl font-semibold'>Domain Age Checker</h1>
          <div className='flex flex-col text-center'>
            <input
              className='border-[#34495e] text-black border-[2px] w-[55%] ml-[22%] mt-5 py-1 rounded-lg px-2'
              placeholder='Enter your URL'
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className='mt-4'>
              <button onClick={checkDomainAge} className='bg-blue-600 text-white px-4 py-2 rounded'>
                Check Domain Age
              </button>
            </div>
          </div>
        </div>
  
        {domainAge !== null && (
          <div className='bg-slate-200 m-2 rounded p-5'>
            <div className='bg-[#34495e] rounded text-white text-center py-1'>
              <h2 className='text-4xl'>Domain Age:</h2>
            </div>
            <div className='flex flex-col bg-[#e6e6e6] p-5'>
              <p className='text-xl font-semibold whitespace-nowrap mt-7'>{domainAge}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default DomainAgeChecker;
  