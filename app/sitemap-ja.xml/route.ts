import { generateSitemapXml } from '../../lib/sitemapHelper';

export async function GET() {
    const xml = generateSitemapXml('ja');

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
