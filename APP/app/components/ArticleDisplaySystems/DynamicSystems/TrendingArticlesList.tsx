
import { filterAndSliceArticles } from "@/app/lib/FilterArticles";
import { Article } from "@/app/models/article";
import { ArticleLink } from '@/app/components/utils/ArticleLink';



const TrendingArticlesList: React.FC<{
  data: Article[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
  views?: number;
  articleAmount?: number;
}> =  async ({ data, category, tag, journalist, dayInterval, startIndex, endIndex, articleAmount }) => {

  let slicedData = filterAndSliceArticles(data, category, tag, journalist, dayInterval, startIndex, endIndex);
  slicedData = slicedData.sort((a, b) => b.views - a.views);
  return (
    <section id="trending" className="inline-block xl:sticky top-20 p-6 md:p-4 min-w-[300px] w-[95vw] lg:w-full bg-second_color_light dark:bg-second_color_dark rounded-2xl">
      <div>
        <h1 className="text-sm font-bold mb-4">TOPNYHEDER</h1>
        <ul className="space-y-2">
        {slicedData.map((post: Article, index: number) => (
              <li
                key={post._id}
                className="flex items-center border-b-2  border-b-text_second_color_light dark:border-b-text_second_color_dark pb-2"
              >
                <article className="font-bold text-text_second_color_dark dark:text-text_second_color_light text-xl min-w-6">{index + 1}</article>
                <ArticleLink href={`/artikel/${post.republishArticle && post.newSlug.length > 0 ? post.newSlug : post.articleSlug}`}>
                  <header className="ml-2 text-main_color_dark dark:text-main_color_light  hover:text-accent_color_light dark:hover:text-accent_color_dark transition-colors text-sm ">
                    <h2>{post.title}</h2>
                  </header>
                </ArticleLink>
              </li>
            )).slice(0, articleAmount)}
        </ul>
      </div>
    </section>
  );
};

export default TrendingArticlesList;
