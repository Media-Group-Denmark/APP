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
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";

async function getData(
  category = "",
  tag = "",
  journalist = "",
  dayInterval = 0,
  startIndex: number,
  endIndex: number,
  articles: Article[]
) {
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
        ${
          tag
            ? '&& tag[]->slug.current match "' + encodeURIComponent(tag) + '*"'
            : ""
        }
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
      | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      _createdAt,
      _type,
      title,
      publishedAt,
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

type TopNewsSliderProps = {
  category: string;
  tag: string;
  journalist: string;
  data: Article[];
  dayInterval: number;
  startIndex: number;
  endIndex: number;
  articles: Article[];
};

const TopNewsSlider: React.FC<TopNewsSliderProps> = async ({
  category = '',
  tag = '',
  journalist = '',
  dayInterval,
  startIndex,
  endIndex,
  articles = []
}) => {
  const data = await getData(
    category,
    tag,
    journalist,
    dayInterval,
    startIndex,
    endIndex,
    articles
  );
  return (
    <aside className="max-w-[1000px] mx-auto px-6 mt-8 md:mt-0">
      <figure className="flex gap-[12px]">
        <h2 className="text-md font-bold">Seneste Nyt</h2>
        <ChevronRight className="font-black my-auto" size={22} />
      </figure>
      <nav className="sliderNav">
        <ul
          style={{ gridTemplateColumns: "repeat(12, auto)" }}
          className="grid grid-cols-[12] overflow-x-scroll overflow-y-visible mb-6 lg:mb-12 ml-0"
        >
          {data.slice(startIndex, endIndex).map((article: Article) => (
            <li className="min-w-[240px] min-h-[110px] relative border-t-2 border-second_color_dark dark:border-second_color_light my-4 pt-4 pr-4">
              <span className="w-2 h-2 bg-second_color_dark dark:bg-main_color_light absolute rounded-full -top-[5px] left-0"></span>
              <Link href={`/artikel/${article.articleSlug}`}>
                <time dateTime={article.publishedAt} className=" text-xs ">
                  {timeSinceText({ date: article.publishedAt })}
                </time>
                <h3 className="text-[0.9rem] mt-2 font-semibold text-text_main_color_dark dark:text-text_main_color_light">
                  {article.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default TopNewsSlider;
