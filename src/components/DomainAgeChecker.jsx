import React, { useState } from 'react';
import axios from 'axios';

const DomainAgeChecker = () => {
  const [url, setUrl] = useState('');
  const [domainAge, setDomainAge] = useState(null);
  const [error, setError] = useState(null);

  const checkDomainAge = async () => {
    try {
      const options = {
        method: 'GET',
        url: `https://domain-age-checker-v8.p.rapidapi.com/domainage/${url}`,
        headers: {
          'X-RapidAPI-Key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
          'X-RapidAPI-Host': 'domain-age-checker-v8.p.rapidapi.com',
        },
      };
  
      const response = await axios.request(options);
      console.log('Full API Response:', response); // Log the entire response
  
      const age = response.data?.age;
  
      if (age !== undefined) {
        setDomainAge(age);
        setError(null);
      } else {
        setDomainAge('Not available');
        setError('Domain age not found in the API response.');
      }
    } catch (error) {
      console.error('Error checking Domain Age:', error.message);
      setDomainAge('Not available');
      setError('Error fetching domain age. Please try again.');
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
        <p className='text-xl text-center mt-4'>
          Uncover the birthdate of any domain swiftly with our Domain Age Checker. Navigate digital landscapes!
        </p>
        <div className='flex flex-col text-center'>
          <input
            className='border-[#34495e] text-black border-[2px] w-[55%] ml-[22%] mt-5 py-1 rounded-lg px-2'
            placeholder='Enter your URL'
            type='text'
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
            {error ? (
              <p className='text-xl font-semibold text-red-600'>{error}</p>
            ) : (
              <p className='text-xl font-semibold whitespace-nowrap mt-7'>{domainAge}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainAgeChecker;
