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
    console.log(data);
    return data;
  }

  function toDanishTime(date) {
    const options = { timeZone: 'Europe/Copenhagen', timeZoneName: 'short' };
    return new Date(date).toLocaleString('da-DK', options);
}

export async function GET() {

    const feed = new RSS({
        title: theme.site_name,
        description: theme.metadata.description,
        generator: `RSS til ${theme.site_name} `,
        feed_url: `${theme.site_url}/feed.xml`,
        site_url: theme.site_url,
        managingEditor: 'mac@mgdk.dk (Marc Christiansen)',
        webMaster: 'mac@mgdk.dk (Marc Christiansen)',
        copyright: `Copyright ${new Date().getFullYear().toString()}, Marc Christiansen`,
        language: theme.metadata.openGraph.locale,
        pubDate: toDanishTime(new Date()),
        ttl: 60,
    });

    const articles = await getData();

    articles.forEach((article: any) => {
        feed.item({
            title: article.title,
            description: article.teaser,
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