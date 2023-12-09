import React, { useState} from 'react';
import axios from 'axios';
import "./loader.css";
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function SeoChecker() {
  const [url, setUrl] = useState('');
  const [seoReport, setSeoReport] = useState(null);
  const [loadingTime, setLoadingTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);




  const analyzeWebsite = async () => {
    try {
      setIsLoading(true); 

      const startTime = performance.now();
      const response = await axios.post('http://localhost:3001/analyze', { url });
      const endTime = performance.now();

      setSeoReport(response.data);
   // Calculate the page load time in seconds
   const pageLoadTime = (endTime - startTime) / 1000;
   setLoadingTime(pageLoadTime);
    } catch (error) {
      console.error('Error analyzing website:', error.message);
    }    finally {
      setIsLoading(false); // Set loading state to false when analysis completes
    }
  };

  

  // Add this function inside your SeoChecker component
  const calculateSeoPercentage = () => {
    const weights = {
      h1Tags: 10,
      h2Tags: 5,
      metaTitle: 8,
      metaDescription: 8,
      commonKeywords: 5,
      robotsTxt: 5,
      altTags: 10,
      canonicalTags: 8,
      xmlSitemap: 8,
      loadTime: 10, // Adjust the weight based on its importance
    };

    const fulfilledCriteria = [
      seoReport?.h1Tags?.length <= 1,
      seoReport?.h2Tags?.length > 1,
      seoReport?.metaTitle.length >= 15,
      seoReport?.metaDescription.length >= 100,
      seoReport?.commonKeywords.length > 0,
      seoReport?.hasRobotsTxt,
      seoReport?.images.every(image => image.alt),
      seoReport?.hasCanonicalTags,
      seoReport?.hasXmlSitemap,
      loadingTime !== null && loadingTime <= 5, // Adjust the condition based on your load time criteria
    ];

    // Calculate the total weight and fulfilled weight
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    const fulfilledWeight = fulfilledCriteria.reduce((sum, criterion, index) => (criterion ? sum + weights[Object.keys(weights)[index]] : sum), 0);

    // Calculate the percentage
    const percentage = (fulfilledWeight / totalWeight) * 100;
    return percentage.toFixed(1);
  };

  const seoPercentage = calculateSeoPercentage();
 
  let progressBarColor;
  if (seoPercentage < 50) {
    progressBarColor = 'red';
  } else if (seoPercentage >= 50 && seoPercentage < 80) {
    progressBarColor = '#FF5733  ';
  } else {
    progressBarColor = 'green';
  }
 
  let finalreport;

  if (seoPercentage < 50) {
    finalreport = (
      <p>This is your website overall report {seoPercentage}. Now you need some improvement in your website for better ranking.</p>
    );
  } else if (seoPercentage <= 80 && seoPercentage >= 50) {
    finalreport = (
      <p>This is your website overall report {seoPercentage}. Do some changings in your website for more better SEO.</p>
    );
  }  else if (seoPercentage <= 81 && seoPercentage >= 100) {
    finalreport = (
      <p>Great! Your website overall SEO report{seoPercentage} is perfect.</p>
    );
  }  else {
    finalreport = (
      <p>Another message or component for a different condition.</p>
    );
  }
  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
         
        >
          <Typography  variant="caption" component="div" color="textSecondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  const hasMultipleH1Tags = seoReport?.h1Tags?.length > 1;
  const hasMultipleH2Tags = seoReport?.h2Tags?.length <= 1;
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      analyzeWebsite();
    }
  };

  return (
    <div>
    {isLoading && (
  <div className="loader-overlay">
  <div className="loader"></div>
</div>
      )}
      <div className='bg-[#003366] text-white w-[100%]  border-[2px] border-[#34495e] h-[300px] '>
    
        <h1 className='text-center text-3xl font-semibold mt-5'>Website SEO Checker</h1>
        <p className='text-xl text-center mt-4'>Elevate Your Online Presence: Your Ultimate Guide to SEO Success <br /> with Website SEO Checker.</p>
        <div className='flex flex-col text-center'>
          <input
            className='border-[#34495e] text-black border-[2px] w-[55%] ml-[22%] mt-5 py-1 rounded-lg px-2'
            placeholder='Enter your URL'
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className='mt-4'>
            <button onClick={analyzeWebsite} onKeyPress={handleKeyPress} className='bg-blue-600 text-white px-4 py-2 rounded '>
              Analyze
            </button>
          </div>
        </div>
      </div>
      {seoReport && (
        <div className='bg-slate-200 m-2 rounded'>
          <div className='bg-[#34495e] rounded text-white text-center py-1'>
            <h2 className='text-4xl'>SEO Report:</h2>
          </div>
          
      {/* SEO Meter */}
<div className='flex flex-col sm:flex w-full mt-3'>
  <div className=' w-full sm:w-[40%] ml-2 '>
    <p className='text-2xl text-center'>{finalreport}</p>
  </div>
<div className='w-full sm:w-[60%] ' style={{ height: '200px', color: progressBarColor }}>
  <div className=' px-[40%] mt-4 sm:-mt-14 sm:px-[140%]'>
            <CircularProgressWithLabel
              variant="determinate"
              value={seoPercentage}
              thickness={10} 
              size={150}
              style={{ color: progressBarColor }}
            />
            </div>
          </div>
          </div>


          <div className='flex flex-col bg-white -mt-5 rounded-lg py-2 h-auto'>
            <p className='text-xl font-semibold whitespace-nowrap mt-7 px-1'>H1 Tags:</p>
            <div className='flex flex-col'>
            <div className='ml-10 mt-2'>
              {hasMultipleH1Tags ? (
                <div className='flex items-center text-red-600'>
                  <span className='mr-2 text-xl'>There are many H1 tags in your website, but every single page should be only one H1 tag.</span>
                  <span role="img" aria-label="error-icon">❌</span>
                </div>
              ) : (
                <div className='flex items-center text-gray-700 text-[20px]'>
                  <span className='mr-2 text-xl'>Great! In your website, there is only one H1 tag, which is best for SEO.</span>
                  <span role="img" aria-label="success-icon">✅</span>
                </div>
              )}
      </div>
      
            <ul className='flex flex-col text-white py-2  ml-10 px-4 rounded-lg mt-2 m-1 bg-[#34495e] '>
              {seoReport.h1Tags.map((tag, index) => (
                <li  key={index}>
                  {`${index + 1}:  ${tag}`}
                  {index < seoReport.h1Tags.length - 1 && ','}
                </li>
              ))}
            </ul>
            </div>
    </div>
<hr className='w-screen mt-2 mb-2 h-[2px] bg-slate-600' />


          <div className='flex flex-col'>
            <p className='text-xl font-semibold whitespace-nowrap mt-7'>H2 Tags:</p>
            <div className='flex flex-col'>
            <div className='ml-10 mt-2'>
              {hasMultipleH2Tags ? (
                <div className='flex items-center text-red-600'>
                  <span className='mr-2 text-xl'>There have not found any H2 Tag in your website.</span>
                  <span role="img" aria-label="error-icon">❌</span>
                </div>
              ) : (
                <div className='flex items-center text-gray-700 text-xl font-semibold'>
                  <span className='mr-2 text-xl'>H2 Tags are sufficient in your website.</span>
                  <span role="img" aria-label="success-icon">✅</span>
                </div>
              )}
      </div>
            <ul className='flex flex-col ml-10 bg-[#34495e] py-2 text-white px-4 rounded-lg mt-2 m-1'>
              {seoReport.h2Tags.map((tag, index) => (
                <li key={index}>
                  {`${index + 1}: ${tag}`}
                  {index < seoReport.h2Tags.length - 1 && ','}
                </li>
              ))}
            </ul>
            </div>
          </div>
          <hr className='w-screen mt-2 mb-2 h-[2px] bg-slate-600' />

          <div className='flex rounded-lg py-2 h-auto bg-white'>
  <p className='text-xl font-semibold  px-2'>Meta Title:</p>
  {seoReport.metaTitle.length < 15 ? (
    <div className='flex items-center ml-4 text-red-600'>
      <span className='mr-2 text-xl'>Meta Title length is too minimum. Increase it for better SEO.</span>
      <span role="img" aria-label="error-icon">❌</span>
    </div>
  ) : (
    <div className='flex items-center ml-4 text-xl font-semibold text-gray-700'>
    <span role="img" aria-label="success-icon">✅</span>

    </div>
  )}
  <p className='ml-2 font-semibold mt-1 text-gray-600 text-xl'>{seoReport.metaTitle}</p>
</div>

<hr className='w-screen mt-2 mb-2 h-[2px] bg-slate-600' />

<div className='flex flex-col mt-4  w-screen'>
  <p className='text-xl font-semibold mt-2'>Meta Description:</p>
  {seoReport.metaDescription.length < 100 ? (
    <div className='flex items-center text-red-600'>
      <span className='mr-2 text-xl ml-4'>Your meta description is too short. Please increase it.</span>
      <span role="img" aria-label="error-icon">❌</span>
    </div>
  ) : (
    <div className='flex items-center text-gray-700 mt-4'>
    <span role="img" aria-label="success-icon">✅</span>

    </div>
  )}
  <p className=' w-[95%] text-gray-600 ml-6 font-semibold  '>{seoReport.metaDescription}</p>
</div>
<hr className='w-screen mt-2 mb-2 h-[2px] bg-slate-600' />


          {/* Add styling for other SEO elements as needed */}

          <div className='flex rounded-lg py-2 h-auto bg-white px-2'>
            <p className='text-xl font-semibold'>Common Keywords:</p>
            <ul className='flex gap-4 ml-2'>
              {seoReport.commonKeywords.map((keyword, index) => (
                <li className='bg-black text-white px-2 rounded' key={index}>{keyword}</li>
              ))}
            </ul>
          </div>

          {/* Add styling for other SEO elements as needed */}

             {/* Render each SEO element in a separate div */}
            
        <div className='bg-[#34495e] px-2 py-2 rounded mt-5 mb-5 text-white font-semibold'>
         <p>Advance SEO </p>
        </div>
        <div className='flex'>
  <p className='text-xl font-semibold'>Robots:</p>
  {seoReport.hasRobotsTxt ? (
    <div className='flex items-center ml-4 text-gray-700'>
      <span className='mr-2 text-xl'>Great! Robots.txt file is in your website.</span>
      <span role="img" aria-label="success-icon">✅</span>
    </div>
  ) : (
    <div className='flex items-center ml-4 text-red-600'>
      <span className='mr-2 text-xl'>Robots.txt file is missing.</span>
      <span role="img" aria-label="error-icon">❌</span>
    </div>
  )}
</div>

<div className='flex mt-4 w-screen'>
  <p className='text-xl font-semibold mt-2'>Images without Alt Tags:</p>
  <div className='flex flex-col ml-2'>
    {seoReport.images && seoReport.images.length > 0 ? (
      seoReport.images.map((image, index) => (
        <div key={index} className='flex items-center text-red-600 mt-2 text-xl'>
          <span>{`This image has no alt tag: `}</span>
          <span className='text-blue-500 underline ml-1'>{image.src}</span>
        </div>
      ))
    ) : (
      <div className='text-gray-700 mt-2 text-xl'>All images have alt tags. Good job!</div>
    )}
  </div>
</div>

{/* Google Search-like result preview */}
<div className=' flex flex-col sm:flex  mt-5'>
  <div>
<h2 className='text-xl font-semibold mb-2'>Search  Preview:</h2>
</div>
<div className='bg-white flex flex-col h-auto rounded-lg ml-2 py-2'>
 <div className='ml-2'>
 <span className='text-[#1a0dab] text-xl '>{seoReport.metaTitle}</span>
 </div>
 <div className='ml-2 text-xl'>
        <a href={url} className='text-[#006621] ml-1'>{url}</a>
        </div>
 <div className='ml-2 w-[90%]'>
      <p className='text-gray-700 '>{seoReport.metaDescription}</p>
      </div>
</div>
</div>
{/* Check for Canonical Tags */}
<div className='flex mt-4'>
  <p className='text-xl font-semibold'>Canonical Tags:</p>
  {seoReport.hasCanonicalTags ? (
    <div className='flex items-center ml-4 text-gray-700'>
      <span className='mr-2 text-xl'>Great! Your website has canonical tags.</span>
      <span role="img" aria-label="success-icon">✅</span>
    </div>
  ) : (
    <div className='flex items-center ml-4 text-red-600'>
      <span className='mr-2 text-xl'>In your website, there are no canonical tags.</span>
      <span role="img" aria-label="error-icon">❌</span>
    </div>
  )}
</div>

{/* Check for XML Sitemap */}
<div className='flex mt-4'>
  <p className='text-xl font-semibold'>XML Sitemap:</p>
  {seoReport.hasXmlSitemap ? (
    <div className='flex items-center ml-4 text-gray-700'>
      <span className='mr-2 text-xl'>We found XML Sitemap in your website.</span>
      <span role="img" aria-label="success-icon">✅</span>
    </div>
  ) : (
    <div className='flex items-center ml-4 text-red-600'>
      <span className='mr-2 text-xl'>We have not found XML Sitemap in your website.</span>
      <span role="img" aria-label="error-icon">❌</span>
    </div>
  )}
</div>

{loadingTime !== null && (
        <div className='mt-4 flex'>
           <p className='font-semibold text-xl'>Load Time:</p>
          {loadingTime > 5 ? (
            <div className='flex items-center ml-4 text-red-600'>
              <span className='mr-2 text-xl'>{`This is your website load time ${loadingTime.toFixed(1)} seconds. Need to improve your website speed.`}</span>
              <span role="img" aria-label="error-icon">❌</span>
            </div>
          ) : (
            <div className='flex items-center ml-4 text-gray-700'>
              <span className='mr-2 text-xl'>{`This is your website load time ${loadingTime.toFixed(1)} seconds. Your speed is best.`}</span>
              <span role="img" aria-label="success-icon">✅</span>
            </div>
          )}
        </div>
      )}

        </div>
      )}
    </div>
  );
}

export default SeoChecker;
