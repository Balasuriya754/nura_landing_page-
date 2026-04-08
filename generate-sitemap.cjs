const { SitemapStream } = require('sitemap');
const fs = require('fs');
const { writeFileSync, readFileSync } = require('fs');
const { resolve } = require('path');

const hostname = 'https://60plus.nurahub.com';

const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/privacy-policy', changef: 'yearly', priority: 0.5 },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.5 },
  { url: '/elderly-care-services-chennai', changefreq: 'monthly', priority: 0.8 }
];

const sitemap = new SitemapStream({ hostname });
sitemap.pipe(fs.createWriteStream(resolve('./public/sitemap.xml')));

pages.forEach(link => sitemap.write(link));
sitemap.end();

setTimeout(() => {
  let xml = readFileSync('./public/sitemap.xml', 'utf8');
  // Remove double <?xml declarations if any
  xml = xml.replace(/<\?xml version="1.0" encoding="UTF-8"\?>\n<?xml version="1.0" encoding="UTF-8"\?>/g, '<?xml version="1.0" encoding="UTF-8"?>');
  writeFileSync('./public/sitemap.xml', xml);
}, 500);
