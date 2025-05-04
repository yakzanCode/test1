// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import fetch from 'node-fetch'; // If using ESModules, make sure to install this: npm install node-fetch

const hostname = 'https://yourdomain.com'; // Change to your production domain
const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream('./dist/sitemap.xml');

sitemap.pipe(writeStream);

async function generateSitemap() {
  try {
    // Static pages
    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/products', changefreq: 'weekly', priority: 0.8 });
    sitemap.write({ url: '/about', changefreq: 'monthly' });
    sitemap.write({ url: '/contact', changefreq: 'monthly' });

    // Fetch dynamic data from your API
    const [productsRes, categoriesRes] = await Promise.all([
      fetch('https://shop-o510.onrender.com/api/products'),
      fetch('https://shop-o510.onrender.com/api/products/categories')
    ]);

    const products = await productsRes.json();
    const categories = await categoriesRes.json();

    // Product pages
    products.forEach(product => {
      sitemap.write({ url: `/product/${product._id}`, changefreq: 'weekly', priority: 0.7 });
    });

    // Category pages
    categories.forEach(category => {
      sitemap.write({ url: `/category/${encodeURIComponent(category)}`, changefreq: 'weekly', priority: 0.6 });
    });

    sitemap.end();

    await streamToPromise(sitemap);
    console.log('✅ sitemap.xml successfully generated.');
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
  }
}

generateSitemap();
