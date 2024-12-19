
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";


const TrendingArticlesListTwo: React.FC<{
  data: ArticleModel[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
  views: number;
  articleAmount?: number;
}> =  async ({ data, category, tag, journalist, dayInterval, startIndex, endIndex, views, articleAmount}) => {

  let slicedData = filterAndSliceArticles(data, category, tag, journalist, dayInterval, startIndex, endIndex);
  slicedData = slicedData.sort((a, b) => b.views - a.views);
  return (
    <section
      id="trending"
      className=" md:px-2 md:min-w-[380px] md:max-h-[500px] xl:w-full md:overflow-y-scroll  rounded-2xl h-fit grid place-content-start"
    >
      <div>
        {/*  Header Start */}
        <h1 className="pb-4">
          <span>
            <span className="mr-2 animate-pulse">🔴</span>Mest populære
          </span>
        </h1>
        {/*  Header End */}

        <ul className="space-y-4">
        {slicedData.map((post: Article, index: number) => (
              <li>
                <article className="bg-second_color_light dark:bg-second_color_dark rounded-2xl">

                  <div >
                    {/*  Læsetid Desktop Start */}
                    {/* <span className="hidden md:inline-block">
                      <p className="  text-main_color_dark dark:text-main_color_light ml-[28px]  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.75rem] rounded-full ">
                        Læsetid:{" "}
                        <span className="text-accent_color_light  dark:text-accent_color_dark">
                          {post.reading} min
                        </span>
                      </p>
                    </span> */}
                    {/*  Læsetid Desktop End */}

                    <div key={post._id} className="flex items-center">
                     
                      <figure className="block max-w-20 mr-6 rounded-xl overflow-clip">
                        <ArticleLink href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
                    post.republishArticle && post.newSlug
                      ? post.newSlug
                      : post.articleSlug
                  }`}>
                          <img
                          width={300}
                          height={300}
                            src={urlFor(post.image)
                              .format("webp")
                              .width(300)
                              .height(300)
                              .fit("fill")
                              .quality(85)
                              .url()}
                            loading="lazy"
                            alt={post.title} // Husk at inkludere en beskrivende alt-tekst
                            className=" object-cover bg-center"
                          />
                        </ArticleLink>
                      </figure>
                      {/*  Image Mobile End */}

                      <div>
                        {/*  Læsetid Mobile Start */}
                        <span className=" inline-block md:hidden">
                          <p className="  text-main_color_dark dark:text-main_color_light ml-[8px]  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.75rem] rounded-full ">
                            Læsetid:{" "}
                            <span className="text-accent_color_light  dark:text-accent_color_dark">
                              {post.reading} min
                            </span>
                          </p>
                        </span>
                        {/*  Læsetid Mobile End */}

                        {/*  Title Start */}
                        <ArticleLink
                          className="ml-4 md:ml-0"
                          href={`/artikel/${post.republishArticle && post.newSlug ? post.newSlug : post.articleSlug}`}
                        >
                          <h2 className="ml-2 text-main_color_dark dark:text-main_color_light font-semibold  hover:text-accent_color_light dark:hover:text-accent_color_dark transition-colors text-sm ">
                            {post.title}
                          </h2>
                          {/*  Title End */}
                        </ArticleLink>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )).slice(0, articleAmount)}
        </ul>
      </div>
    </section>
  );
};

export default TrendingArticlesListTwo;
