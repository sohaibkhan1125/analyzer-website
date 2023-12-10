const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3001;

// Explicitly allow requests from http://localhost:3000 (your React app's origin)
const corsOptions = {
  origin: 'https://your-vercel-app.vercel.app',
  optionsSuccessStatus: 200,
};



app.use(cors(corsOptions));
app.use(express.json());

// Function to extract common keywords from the text
function extractCommonKeywords(text, numKeywords = 5) {
  // Replace non-alphanumeric characters with spaces and convert to lowercase
  const cleanedText = text.replace(/[^a-zA-Z0-9]/g, ' ').toLowerCase();
  
  // Split the text into an array of words
  const words = cleanedText.split(/\s+/);

  // Create a frequency map of words
  const wordFrequency = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  // Sort the words by frequency in descending order
  const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

  // Return the top N keywords
  return sortedWords.slice(0, numKeywords);
}

// Function to calculate the link ratio
function calculateLinkRatio(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = $('a');
  let internalLinks = 0;
  let externalLinks = 0;

  links.each((index, element) => {
    const href = $(element).attr('href');
    if (!href) {
      return;
    }

    // Create an absolute URL from relative URLs
    const absoluteUrl = new URL(href, baseUrl).href;

    if (absoluteUrl.startsWith(baseUrl)) {
      internalLinks++;
    } else {
      externalLinks++;
    }
  });

  return { internalLinks, externalLinks };
}

app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  try {
    // Fetch HTML content of the provided URL
    const response = await axios.get(url);
    const html = response.data;

    // Use Cheerio to parse HTML
    const $ = cheerio.load(html);

    // Extract H2 tags, meta title, and description
    const h1Tags = $('h1').map((i, el) => $(el).text()).get();
    const h2Tags = $('h2').map((i, el) => $(el).text()).get();
    const metaTitle = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');

    // Extract common keywords from the entire text content
    const textContent = $('body').text(); // You might want to refine this selector based on your needs
    const commonKeywords = extractCommonKeywords(textContent);

    // Check for keywords in title and description
    const titleKeywords = extractCommonKeywords(metaTitle);
    const descriptionKeywords = extractCommonKeywords(metaDescription);

    // Calculate link ratio
    const { internalLinks, externalLinks } = calculateLinkRatio(html, url);
    
    // Images Alt Tags
    const images = [];
    // Check for missing alt tags on images
    $('img').each((index, element) => {
      const alt = $(element).attr('alt');
      const src = $(element).attr('src');
      if (!alt) {
        images.push({ src, alt: 'No alt tag' });
      }
    });
    const seoReport = {
      h1Tags,
      h2Tags,
      metaTitle,
      metaDescription,
      commonKeywords,
      titleKeywords,
      descriptionKeywords,
      internalLinks,
      externalLinks,
      images,
      // Add more SEO-related information as needed
    };

    // Check if keywords are missing in title and description
    if (titleKeywords.length === 0 && descriptionKeywords.length === 0) {
      seoReport.warning = 'No page description found on the page.';
    }

    res.json(seoReport);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while analyzing the website.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
