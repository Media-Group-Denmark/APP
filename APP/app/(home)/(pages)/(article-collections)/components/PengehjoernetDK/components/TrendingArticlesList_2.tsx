
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";


const TrendingArticlesList_2: React.FC<{
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
      className=" md:px-2 min-w-[280px] xl:w-full  rounded-2xl h-fit grid place-content-center"
    >
      <div>
        {/*  Header Start */}
        <h1 className="lineHeader text-center text-[0.95rem] font-bold mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1">
            TOPNYHEDER
          </span>
        </h1>
        {/*  Header End */}

        <ul className="space-y-4">
        {slicedData.map((post: Article, index: number) => (
              <li>
                <article className="bg-second_color_light dark:bg-second_color_dark rounded-2xl">
                  {/*  Image Desktop Start */}
                  <figure className="hidden md:block w-full h-[5em] md:h-[7em] rounded-t-xl bg-gray-300 overflow-clip">
                    <ArticleLink
                      aria-label="Læs mere om artiklen"
                      href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
                        post.republishArticle && post.newSlug
                          ? post.newSlug
                          : post.articleSlug
                      }`}
                    >
                      <img
                      width={400}
                      height={300}
                        src={urlFor(post.image)
                          .format("webp")
                          .width(400)
                          .height(300)
                          .fit("fill")
                          .quality(85)
                          .url()}
                        alt={post.title} // Sørg for at inkludere en beskrivende alt-tekst
                        loading="lazy"
                        className="w-full h-full object-cover bg-center"
                      />
                    </ArticleLink>
                  </figure>
                  {/*  Image Desktop End */}

                  <div className="md:pb-2 md:pt-1 md:px-3">
                    {/*  Læsetid Desktop Start */}
                    <span className="hidden md:inline-block">
                      <p className="  text-main_color_dark dark:text-main_color_light ml-[28px]  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.75rem] rounded-full ">
                        Læsetid:{" "}
                        <span className="text-accent_color_light  dark:text-accent_color_dark">
                          {post.reading} min
                        </span>
                      </p>
                    </span>
                    {/*  Læsetid Desktop End */}

                    <div key={post._id} className="flex items-center    md:pb-2">
                      {/*  Index Desktop Start */}
                      <span className="font-bold text-[#a7a7a7] text-2xl min-w-6 hidden md:inline-block">
                        {index + 1}
                      </span>
                      {/*  Index Desktop End */}

                      {/*  Image Mobile Start */}
                      <figure className="block md:hidden max-w-20 mr-6 rounded-xl overflow-clip">
                        <ArticleLink href={`/artikel/${post.republishArticle && post.newSlug ? post.newSlug : post.articleSlug}`}>
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

export default TrendingArticlesList_2;
