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

async function getData(
  category = "",
  tag = "",
  journalist = "",
  dayInterval = 0
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
            ? `&& _createdAt >= "${formattedQueryStart}" && _createdAt <= "${formattedToday}"`
            : ""
        }
      ]
      | order(views desc) [0...10] {
      _id,
      _createdAt,
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
  console.log(
    formattedToday,
    formattedQueryStart,
    category,
    tag,
    journalist,
    dayInterval
  );
  return data;
}

const TrendingArticlesListAltOmKendte: React.FC<{
  category?: string | undefined;
  tag?: string[] | undefined;
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> = async ({
  category,
  tag,
  journalist,
  dayInterval,
  startIndex,
  endIndex,
}) => {
  const data = await getData(category, tag, journalist, dayInterval);
  return (
    <aside
      id="trending"
      className=" md:px-2 min-w-[280px] xl:w-full  rounded-2xl h-fit grid place-content-center"
    >
      <div>
        {/*  Header Start */}
        <h2 className="lineHeader text-center text-[0.95rem] font-bold mb-4">
          <span className="bg-accent_color_light dark:bg-bg-accent_color_light text-white px-4 py-1">
            TOPNYHEDER
          </span>
        </h2>
        {/*  Header End */}

        <ul className="space-y-4">
          {data
            .slice(startIndex, endIndex)
            .map((post: Article, index: number) => (
              <div className="bg-second_color_light dark:bg-second_color_dark rounded-2xl">

               {/*  Image Desktop Start */}
                <Link
                  className="hidden md:block"
                  href={`/artikel/${post.articleSlug}`}
                >
                  <div
                    className="block w-full h-[5em] md:h-[7em] rounded-t-xl bg-gray-300 bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${urlFor(post.image)
                        .format("webp")
                        .width(400)
                        .height(300)
                        .fit("fill")
                        .quality(85)
                        .url()})`,
                    }}
                  ></div>
                </Link>
                {/*  Image Desktop End */}

                <div className="md:pb-2 md:pt-1 md:px-3">

                  {/*  Kategori Desktop Start */}
                  <Link className="hidden md:inline-block" href={`/artikler/kategori/${post.categorySlug}`}>
                    <button className=" text-accent_color_light ml-[28px] dark:text-accent_color_dark  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.75rem] rounded-full ">
                      {post.category}
                    </button>
                  </Link>
                  {/*  Kategori Desktop End */}

                  <li key={post._id} className="flex items-center    md:pb-2">

                    {/*  Index Desktop Start */}
                    <span className="font-bold text-[#a7a7a7] text-2xl min-w-6 hidden md:inline-block">
                      {index + 1}
                    </span>
                    {/*  Index Desktop End */}

                    {/*  Image Mobile Start */}
                    <Link
                      className="inline-block md:hidden"
                      href={`/artikel/${post.articleSlug}`}
                    >
                      <div
                        className="block w-full h-[5em] w-[5em] rounded-xl bg-gray-300 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${urlFor(post.image)
                            .format("webp")
                            .width(300)
                            .height(100)
                            .fit("fill")
                            .quality(85)
                            .url()})`,
                        }}
                      ></div>
                    </Link>
                    {/*  Image Mobile End */}

                    <div>
  
                      {/*  Kategori Mobile Start */}
                      <Link className="md:hidden" href={`/artikler/kategori/${post.categorySlug}`}>
                      <button className=" text-accent_color_light ml-[8px] dark:text-accent_color_dark  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.75rem] rounded-full ">
                        {post.category}
                      </button>
                    </Link>
                    {/*  Kategori Mobile End */}
  
                          {/*  Title Start */}
                      <Link className="ml-4 md:ml-0" href={`/artikel/${post.articleSlug}`}>
                        <p className="ml-2 text-main_color_dark dark:text-main_color_light font-semibold  hover:text-accent_color_light dark:hover:text-accent_color_dark transition-colors text-sm ">
                          {post.title}
                        </p>
                        {/*  Title End */}
                      </Link>
                    </div>
                  </li>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default TrendingArticlesListAltOmKendte;
