import RSS from 'rss';
import theme from '../lib/theme.json';
import { client } from '../lib/sanityclient';

/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
async function getData() {
    const query = `
    *[
      _type == "article"
    ] 
    | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      _createdAt,
      publishedAt,
      _type,
      title,
      teaser,
      "articleSlug": slug.current,
      "image": metaImage.asset,
      "category": category->name,
      "categorySlug": category->slug.current,
      "tag": tag[]->name,
      "tagSlug": tag[]->slug.current,
      "JournalistName": journalist->name,
      "JournalistPhoto": journalist->image,
      "JournalistSlug": journalist->slug.current,
      views
    }`;
    const data = await client.fetch(query);
    return data;
}

/* -------------------------------------------------------------------------- */
/*                                FORMAT DATE                                 */
/* -------------------------------------------------------------------------- */
function getDanishPubDate() {
    const date = new Date(); // Current UTC time
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const copenhagenTime = new Date(date.getTime() - offset + (3600000 * 2)); // Add 2 hours to UTC
    return copenhagenTime.toUTCString().replace('GMT', '+0200'); // Replace GMT with +0200
}

/* -------------------------------------------------------------------------- */
/*                            ESCAPE XML CHARACTERS                           */
/* -------------------------------------------------------------------------- */
function escapeXML(str) {
    return str.replace(/&/g, '&#x26;')  // Use hexadecimal for ampersand
              .replace(/</g, '&#x3C;')   // Use hexadecimal for less than
              .replace(/>/g, '&gt;')     // Escape greater than
              .replace(/"/g, '&quot;')  // Escape double quotes
              .replace(/'/g, '&apos;'); // Escape single quotes
}

/* -------------------------------------------------------------------------- */
/*                           GENERATE RSS FEED                                */
/* -------------------------------------------------------------------------- */
export async function GET() {
    const pubDate = getDanishPubDate();

    const feed = new RSS({
        title: theme.site_name,
        description: theme.metadata.description,
        generator: `RSS til ${theme.site_name}`,
        feed_url: `${theme.site_url}/feed.xml`,
        site_url: theme.site_url,
        managingEditor: 'mac@mgdk.dk (Marc Christiansen)',
        webMaster: 'mac@mgdk.dk (Marc Christiansen)',
        copyright: `Copyright ${new Date().getFullYear().toString()}, Marc Christiansen`,
        language: 'da-DK',
        pubDate: pubDate,
        ttl: 60,
    });

    const articles = await getData();

    articles.forEach((article) => {
        feed.item({
            title: escapeXML(article.title),
            description: escapeXML(article.teaser),
            url: `${theme.site_url}/artikel/${article.articleSlug}`,
            guid: article._id,
            date: article.publishedAt,
        });
    });

    const xml = feed.xml({ indent: true });

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
