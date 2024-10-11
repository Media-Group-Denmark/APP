import RSS from 'rss';
import theme from '../lib/theme.json';
import { client, urlFor } from '../lib/sanityclient';
import { PortableText } from "next-sanity";
import { toHTML } from '@portabletext/to-html';
import { getRssFeedData } from '../api/getRssFeedData';
import { singleArticle } from '../(home)/(pages)/artikel/models/singleArticle';

const portableTextToHtml = (portableText) => {
    const serializers = {
        types: {
            block: (props) => {
                switch (props.node.style) {
                    case 'h3':
                        return `<h3>${props.children.join('')}</h3>`;
                    case 'normal':
                    default:
                        return `<p>${props.children.join('')}</p>`;
                }
            },
            imageWithMetadata: () => ``,
            youTube: () => ``,
            tikTok: () => ``,
            faceBook: () => ``,
            instagram: () => ``,
            readMore: () => ``,
            readMoreAutomatic: () => {
                return '';  // Ensure this returns empty string
            },
        },
        // Optionally handle marks like bold, italics, etc.
        marks: {
            strong: (props) => `<strong>${props.children.join('')}</strong>`,
            em: (props) => `<em>${props.children.join('')}</em>`,
            // Handle other types of marks as needed
        }
    };
    return toHTML(portableText, { serializers });
};

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
function escapeXML(str: any) {
    return str.replace(/&/g, '&amp;')  // Escape ampersand
              .replace(/</g, '&lt;')   // Escape less than
              .replace(/>/g, '&gt;')   // Escape greater than
              .replace(/"/g, '&quot;')// Escape double quotes
              .replace(/'/g, '&apos;');// Escape single quotes
}

/* -------------------------------------------------------------------------- */
/*                           GENERATE RSS FEED                                */
/* -------------------------------------------------------------------------- */
export async function GET() {
    const pubDate = getDanishPubDate();

    const feed = new RSS({
        title: theme.site_name,
        description: theme.metadata.description,
        feed_url: `${theme.site_url}/feed.xml`,
        site_url: theme.site_url,
        image_url: `${theme.logo_public_url}`,
        managingEditor: 'mac@mgdk.dk (Marc Christiansen)',
        webMaster: 'mac@mgdk.dk (Marc Christiansen)',
        copyright: `Copyright ${new Date().getFullYear().toString()}, Marc Christiansen`,
        language: 'da',
        categories: [`${theme.metadata.keywords}`],
        pubDate: pubDate,
        ttl: 60,
        custom_namespaces: {
            media: 'http://search.yahoo.com/mrss/'
        }
    });

    const allData: singleArticle[] = await getRssFeedData();
    console.log(allData);
    allData.forEach((article) => {
        const filteredOverview = article.overview.filter(block => 
            block._type !== 'readMoreAutomatic' &&
            block._type !== 'readMore' &&
            block._type !== 'imageWithMetadata' &&
            block._type !== 'youTube' &&
            block._type !== 'tikTok' &&
            block._type !== 'faceBook' &&
            block._type !== 'instagram'
        );
    
        const imageUrl = urlFor(article.image).url();
        const imageSize = article.imageTags.size ? article.imageTags.size.toString() : '0';
        const imageExtension = article.imageTags.extension ? article.imageTags.extension : 'jpeg';
        const articleDescription = portableTextToHtml(filteredOverview);
        const articleCategory = article.category ? article.category : 'Ukategoriseret';
    
        feed.item({
            title: escapeXML(article.title),
            description: articleDescription,
            url: `${theme.site_url}/artikel/${article.articleSlug}`,
            guid: article._id,
            categories: [articleCategory],
            author: escapeXML(article.JournalistName),
            date: article.publishedAt,
            enclosure: {
            url: imageUrl,
                file: imageUrl,
                size: `${imageSize}`,
                type: `image/${imageExtension}` 
            },
            custom_elements: [
                {'media:content': {
                    _attr: {
                        url: imageUrl,
                        width: article.imageTags.metadata.dimensions.width,
                        height: article.imageTags.metadata.dimensions.height,
                        medium: 'image',
                        type: `image/${imageExtension}`
                    },
                    'media:copyright': `${theme.site_name}`,
                    'media:title': escapeXML(article.title),
                    'media:description': {
                        _attr: { type: 'html' },
                        _cdata: article.title
                    },
                    'media:credit': escapeXML(article.source) || 'Shutterstock.com'
                }},
                {'media:thumbnail': {
                    _attr: {
                        url: imageUrl,
                        width: article.imageTags.metadata.dimensions.width,
                        height: article.imageTags.metadata.dimensions.height
                    }
                }}
            ],
            updated: article._updatedAt,
        });
        //console.log(imageUrl);
    });
    
    

    const xml = feed.xml({ indent: true });
    const xmlSize = new Blob([xml]).size;

    console.log(`RSS feed size: ${xmlSize} bytes`);

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}