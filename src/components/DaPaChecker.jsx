import React, { useState } from 'react';
import axios from 'axios';
import "./loader.css";


function DaPaChecker() {
  const [url, setUrl] = useState('');
  const [daPaReport, setDaPaReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const checkDaPa = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get('https://domain-da-pa-check.p.rapidapi.com/', {
        params: {
          target: url
        },
        headers: {
          'X-RapidAPI-Key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
          'X-RapidAPI-Host': 'domain-da-pa-check.p.rapidapi.com'
        }
      });

      // Log the entire response for debugging
      console.log('API Response:', response.data);

      // Set the specific information to the state
      setDaPaReport({
        pageAuthority: response.data.body.pa_score,
        spamScore: response.data.body.spam_score,
        totalBacklinks: response.data.body.total_backlinks
      });
    } catch (error) {
      console.error('Error checking DA PA:', error.message);
    } finally{
      setIsLoading(false); 
    
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkDaPa();
    }
  };

  return (
    <div>
       {isLoading && (
  <div className="loader-overlay">
  <div className="loader"></div>
</div>
      )}
      <div className='bg-[#003366] text-white w-[100%] border-[2px] border-[#34495e] p-5'>
        <h1 className='text-center text-3xl font-semibold'>Website DA PA Checker</h1>
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
            <button onClick={checkDaPa} className='bg-blue-600 text-white px-4 py-2 rounded'>
              Check DA PA
            </button>
          </div>
        </div>
      </div>

      {daPaReport && (
        <div className='bg-slate-200 m-2 rounded p-5'>
          <div className='bg-[#34495e] rounded text-white text-center py-1'>
            <h2 className='text-4xl'>DA PA Report:</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 ml-[10%] bg-[#e6e6e6] p-5 justify-center gap-4'>

            <div className='bg-gray-300 w-[200px] h-[100px] rounded'> 
            <p className='text-xl font-semibold  text-center mt-2'>Page Authority </p>
            <p className="text-4xl text-blue-500 font-semibold text-center mt-3">{daPaReport.pageAuthority}</p>
            </div>

            <div className='bg-gray-300 w-[200px] h-[100px] rounded'> 
            <p className='text-xl font-semibold  text-center mt-2'>Spam Score</p>
            <p className="text-4xl text-blue-500 font-semibold text-center mt-3">{daPaReport.spamScore}</p>
            </div>

            <div className='bg-gray-300 w-[200px] h-[100px] rounded'> 
            <p className='text-xl font-semibold  text-center mt-2'>Total Backlinks </p>
            <p className="text-4xl text-blue-500 font-semibold text-center mt-3">{daPaReport.totalBacklinks}</p>
            </div>




          </div>
        </div>
      )}
    </div>
  );
}

export default DaPaChecker;
