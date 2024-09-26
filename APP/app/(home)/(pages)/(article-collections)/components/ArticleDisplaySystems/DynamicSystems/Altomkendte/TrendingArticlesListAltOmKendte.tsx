
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";


const TrendingArticlesListAltOmKendte: React.FC<{
  data: Article[];
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
  className="md:px-2 min-w-[280px] xl:w-full rounded-2xl h-fit hidden md:inline-block"
>
  <div>
  
    {/* Header End */}

    <ul className="space-y-6">
      {slicedData
        .slice(0, articleAmount)
        .map((post: Article, index: number) => (
          <div className="flex justify-center items-center">
              <ArticleLink
              href={`/artikel/${
                post.republishArticle && post.newSlug
                  ? post.newSlug
                  : post.articleSlug
              }`}
              aria-label={`Læs mere om ${post.title}`} className="mb-4">
      <div className="max-w-[720px] mx-auto">
  
          <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72">
              <div
                  className="relative h-40 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img
            src={urlFor(post.image)
              .format("webp")
              .width(400)
              .height(300)
              .fit("fill")
              .quality(85)
              .url()}
            alt={post.title}
            className="w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
        {index + 1}
      </div>
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
        {post.reading} min læsning
      </div>
              </div>
              <div className="p-6">
                  <h2 className="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {post.title}
                  </h2>
                 {/*  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio"
                      where you can enjoy the main night life in Barcelona.
                  </p> */}
              </div>
          </div>
      </div>
          </ArticleLink>
  </div>
        ))}
    </ul>
  </div>
</section>


);
};

export default TrendingArticlesListAltOmKendte;

