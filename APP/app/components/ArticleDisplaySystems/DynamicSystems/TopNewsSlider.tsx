
import { Article } from "@/app/models/article";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";

const TopNewsSlider: React.FC<{
  data: Article[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> =  async ({ data, category, tag, journalist, dayInterval, startIndex, endIndex }) => {

  // Find ud af, hvilken dag vi skal filtrere data fra
  const today = new Date();
  today.setDate(today.getDate() - dayInterval as number - 1 || 0);
  const queryDayIndicator = today.toISOString();

// Filtrér og slice data baseret på kategori, tag, journalist og daginterval
const slicedData = data
  .filter(post => {
    const ifDefinedCategory = category ? post.categorySlug === category : true;
    const ifDefinedJournalist = journalist ? post.JournalistSlug === journalist : true;
    const ifDefinedDayInterval = dayInterval ? post.publishedAt >= queryDayIndicator : true;
    const ifDefinedTag = tag ? post.tagSlug.includes(tag as string) : true;
    return ifDefinedCategory && ifDefinedJournalist && ifDefinedDayInterval && ifDefinedTag;
  })
  .slice(startIndex, endIndex);
  return (
    <section className="max-w-[1000px] mx-auto pt-6 md:pt-4 px-6">
      <figure className="flex gap-[12px]">
        <h1 className="text-md">Seneste Nyt</h1>
        <ChevronRight className="font-black my-auto" size={22} />
      </figure>
      <nav className="sliderNav">
        <ul
          style={{ gridTemplateColumns: "repeat(12, auto)" }}
          className="grid grid-cols-[12] overflow-x-scroll overflow-y-visible mb-6 lg:mb-12 ml-0"
        >
          {slicedData.map((post: Article)  => (
            <li className="min-w-[240px] min-h-[110px] relative border-t-2 border-second_color_dark dark:border-second_color_light my-4 pt-4 pr-4">
              <span className="w-2 h-2 bg-second_color_dark dark:bg-main_color_light absolute rounded-full -top-[5px] left-0"></span>
              <Link href={`/artikel/${post.articleSlug}`}>
                <time dateTime={post.publishedAt} className=" text-xs ">
                  {timeSinceText({ date: post.publishedAt })}
                </time>
                <h2 className="text-[0.9rem] mt-2 font-semibold text-text_main_color_dark dark:text-text_main_color_light">
                  {post.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default TopNewsSlider;
