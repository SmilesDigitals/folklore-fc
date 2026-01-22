import { menList } from './lists/men';
import { womenList } from './lists/women';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.folklorefc.com';

/**
 * Get all blog post slugs for a specific locale
 */
function getBlogSlugs(locale: string): string[] {
    try {
        const blogDir = path.join(process.cwd(), 'content/blog', locale.toUpperCase());
        if (!fs.existsSync(blogDir)) return [];

        const files = fs.readdirSync(blogDir);
        return files
            .filter(file => file.endsWith('.md'))
            .map(file => file.replace('.md', ''));
    } catch {
        return [];
    }
}

/**
 * Generate XML string for a specific locale sitemap
 */
export function generateSitemapXml(locale: string): string {
    const allProducts = [...menList, ...womenList];
    const currentDate = new Date().toISOString();

    let urls: string[] = [];

    // 1. Static Pages
    urls.push(`
    <url>
      <loc>${BASE_URL}/${locale}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);

    ['shop/men', 'shop/women', 'blog'].forEach(page => {
        urls.push(`
      <url>
        <loc>${BASE_URL}/${locale}/${page}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `);
    });

    // 2. Products - Filtered by Region
    allProducts.forEach(product => {
        const isGlobalProduct = !product.region;
        const isLocaleProduct = product.region === locale;

        if (isGlobalProduct || isLocaleProduct) {
            urls.push(`
        <url>
          <loc>${BASE_URL}/${locale}/product/${product.id}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `);
        }
    });

    // 3. Blog Posts
    const blogSlugs = getBlogSlugs(locale);
    blogSlugs.forEach(slug => {
        urls.push(`
      <url>
        <loc>${BASE_URL}/${locale}/blog/${slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
    `);
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`;
}
