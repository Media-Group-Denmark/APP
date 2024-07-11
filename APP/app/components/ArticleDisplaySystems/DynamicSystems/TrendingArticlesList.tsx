/* This can be used on a page like this:
<TrendingArticlesList 
dayInterval={7} 
startIndex={0} 
endIndex={5} 
category={data[0].categorySlug or the slug name as string} 
tag={data[0].tagSlug or the slug name as string} />
*/
import { client, urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import Link from "next/link";

async function getData(category = "", tag = "", journalist = "", dayInterval = 0) {
  const today: Date = new Date();
  const queryStart = new Date();
  queryStart.setDate(queryStart.getDate() - (dayInterval || 0));

  const formattedToday = today.toISOString();
  const formattedQueryStart = queryStart.toISOString();

  const query = `
    *[
        _type == "article"
        ${
          category
            ? '&& category->slug.current == "' +
              encodeURIComponent(category) +
              '"'
            : ""
        }
        ${tag ? '&& tag[]->slug.current match "' + encodeURIComponent(tag) + '*"' : ""}
        ${
            journalist
              ? '&& journalist->slug.current == "' +
                encodeURIComponent(journalist) +
                '"'
              : ""
          }
        ${
          (dayInterval as number) > 0
            ? `&& publishedAt >= "${formattedQueryStart}" && publishedAt <= "${formattedToday}"`
            : ""
        }
      ]
      | order(views desc) [0...10] {
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
  console.log(formattedToday, formattedQueryStart, category, tag, journalist, dayInterval);
  return data;
}

const TrendingArticlesList: React.FC<{
  category?: string | undefined;
  tag?: string[] | undefined;
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> = async ({ category, tag, journalist, dayInterval, startIndex, endIndex }) => {
  const data = await getData(category, tag, journalist, dayInterval);
  return (
    <aside id="trending" className="inline-block xl:sticky top-20 p-6 md:p-4 min-w-[300px] w-[95vw] xl:w-full bg-second_color_light dark:bg-second_color_dark rounded-2xl h-fit">
      <div>
        <h2 className="text-sm font-bold mb-4">TOPNYHEDER</h2>
        <ul className="space-y-2">
          {data
            .slice(startIndex, endIndex)
            .map((post: Article, index: number) => (
              <li
                key={post._id}
                className="flex items-center border-b-2  border-b-text_second_color_light dark:border-b-text_second_color_dark pb-2"
              >
                <span className="font-bold text-text_second_color_dark dark:text-text_second_color_light text-xl min-w-6">{index + 1}</span>
                <Link href={`/artikel/${post.articleSlug}`}>
                  <p className="ml-2 text-main_color_dark dark:text-main_color_light  hover:text-accent_color_light dark:hover:text-accent_color_dark transition-colors text-sm ">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default TrendingArticlesList;
