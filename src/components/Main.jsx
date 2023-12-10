import React from 'react';
import report from './report.png';
import issues from './issues.png';
import recommendation from './recommendation.png';

const Main = () => {
  return (
   <main>
    <h1 className='text-center text-3xl font-semibold mt-10 mb-5'>Unlock the advantages provided by SEO Analyzer.</h1>
    <section className='mt-2 w-full flex flex-col sm:flex-row mb-10'>
    <div className='flex flex-col justify-center items-center  w-full sm:w-[32%] '>
        <img className='' src={report} alt="report" />
        <p className='mt-2 text-center w-[80%] text-xl'>Explore a comprehensive analysis of your website. Identify strengths and areas for enhancement in your web pages.</p>
    </div>
    <div className='flex flex-col justify-center items-center w-full sm:w-[33%]'>
        <img className='' src={issues} alt="issues" />
        <p className='mt-2 text-center w-[80%] text-xl'>Effortlessly pinpoint SEO-related issues on your website and receive practical insights for proactive resolution.</p>

    </div>
    <div className='flex flex-col justify-center items-center w-full sm:w-[33%]'>
        <img src={recommendation} alt="recommendation" />
        <p className='mt-2 text-center w-[80%] text-xl'>Leverage our recommendations to effortlessly address SEO issues, boosting your website's ranking with ease.</p>
    </div>
    </section>
    </main>
  )
}

export default Main