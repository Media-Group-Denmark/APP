import RSS from 'rss';
import theme from '../lib/theme.json';
import { urlFor } from '../lib/sanityclient';
import { getMSNFeedData } from './api/getMSNFeedData';

function getDanishPubDate() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const copenhagenTime = new Date(date.getTime() - offset + (3600000 * 2));
  return copenhagenTime.toUTCString().replace('GMT', '+0200');
}

function escapeXML(str: string) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
}


export async function GET() {
  const pubDate = getDanishPubDate();
  
  const allData = await getMSNFeedData();
  
  //General
  const feed = new RSS({
    title: `Galleri Feed ${theme.site_name}`,
    feed_url: `${theme.site_url}/msnfeed`,
    site_url: `${theme.site_url}/msnfeed`,
    description: 'Galleri feed med slideshows',
    /* lastBuildDate: allData[0]._createdAt, */
    custom_namespaces: {
      atom: 'http://www.w3.org/2005/Atom',
      media: 'http://search.yahoo.com/mrss/',
      mi: 'http://schemas.ingestion.microsoft.com/common/',
      dc: 'http://purl.org/dc/elements/1.1/',
      dcterms: 'http://purl.org/dc/terms/'
    }
  });
  //console.log(feed)

//item
  allData.forEach((feedItem: any) => {
    // Opretter <media:content>-elementer for hver artikel
      const mediaContents = (feedItem.articles || []).map((article: any) => {
      const imageUrl = urlFor(article.image).url();
      const imageSize = article.imageTags.size ? article.imageTags.size.toString() : '0';
      const imageExtension = article.imageTags.extension ? article.imageTags.extension : 'jpeg';
      const desc = escapeXML(article.msnDescription) || '';
      const title = escapeXML(article.title) || '';
      const source = article.source || 'Shutterstock.com';

      return {
        'media:content': [
          {
            _attr: {
              url: imageUrl,
              size: `${imageSize}`,
              type: `image/${imageExtension}`,
              medium: "image"
            }
          },
          { 'media:title': title },
          { 'media:credit': escapeXML(source) },
          { 'media:text': escapeXML(desc) },
          { 'media:description': escapeXML(desc) }
        ]
      };
    });

    // Opretter et item for hvert feedItem med alle dets media:content
    feed.item({
      title: escapeXML(feedItem.title),
      description: escapeXML(allData[0].description) || '', 
      url: `${theme.site_url}/guide/${feedItem.feedSlug}`,
      guid: feedItem._id,
      date: feedItem.publishedAt || feedItem._updatedAt,
      categories: [feedItem.category || 'Underholdning'],
      custom_elements: [
        { 'dc:creator': feedItem.JournalistName },
        { 'dcterms:modified': feedItem._updatedAt },
        ...mediaContents
      ]
    });
  });

  const xml = feed.xml({ indent: true });
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
