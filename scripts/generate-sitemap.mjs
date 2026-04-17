import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://gartblog.xyz';
const ARTICLES_DIR = path.resolve('articles');
const EXCLUDE = new Set(['articletemplate.html', 'new-article.html', 'bbc_interview_example.html']);

function toUrl(loc) {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

async function generate() {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const articleUrls = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html') && !EXCLUDE.has(entry.name))
    .map((entry) => `${SITE}/articles/${entry.name}`)
    .sort();

  const urls = [
    `${SITE}/`,
    ...articleUrls
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(toUrl),
    '</urlset>',
    ''
  ].join('\n');

  await writeFile('sitemap.xml', xml, 'utf8');
  console.log(`Updated sitemap.xml with ${urls.length} URLs`);
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
