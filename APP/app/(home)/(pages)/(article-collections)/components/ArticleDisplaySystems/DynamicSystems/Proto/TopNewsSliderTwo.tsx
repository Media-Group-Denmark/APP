import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { ChevronRight } from "lucide-react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import Image from 'next/image'
import { urlFor } from "@/app/lib/sanityclient";

const TopNewsSliderTwo: React.FC<{
  data: ArticleModel[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> = async ({
  data,
  category,
  tag,
  journalist,
  dayInterval,
  startIndex,
  endIndex,
}) => {
  // Find ud af, hvilken dag vi skal filtrere data fra
  const today = new Date();
  today.setDate(((today.getDate() - dayInterval) as number) - 1 || 0);
  const queryDayIndicator = today.toISOString();

  // Filtrér og slice data baseret på kategori, tag, journalist og daginterval
  const slicedData = data
    .filter((post) => {
      const ifDefinedCategory = category
        ? post.categorySlug === category
        : true;
      const ifDefinedJournalist = journalist
        ? post.JournalistSlug === journalist
        : true;
      const ifDefinedDayInterval = dayInterval
        ? post.publishedAt >= queryDayIndicator
        : true;
      const ifDefinedTag = tag ? post.tagSlug.includes(tag as string) : true;
      return (
        ifDefinedCategory &&
        ifDefinedJournalist &&
        ifDefinedDayInterval &&
        ifDefinedTag
      );
    })
    .slice(startIndex, endIndex);
  return (
    <section className="max-w-[1000px] mx-auto pt-4 pb-1 px-6 bg-indigo-100 rounded-lg">
      <p className="font-bold">
            <span className="mr-2 animate-pulse">🔴</span>Seneste nyheder
          </p>
      <nav className="sliderNav">
        <ul
          style={{ gridTemplateColumns: "repeat(12, auto)" }}
          className="grid grid-cols-[12] overflow-x-scroll overflow-y-visible mb-6 lg:mb-12 ml-0"
        >
          {slicedData.map((post: Article) => (
            <li className="min-w-[240px] min-h-[110px] relative border-t-2 border-second_color_dark dark:border-second_color_light my-4 pt-4 pr-4">
              <Image
                src={urlFor(post.image)
                  .format("webp")
                  .width(800)
                  .height(400)
                  .fit("fill")
                  .quality(85)
                  .url()}
                alt={post.title}
                className="rounded-t-2xl rounded-b-lg mb-2"
                width={800}
                height={400} // Justér højden for at bevare aspect ratio
                sizes="(max-width: 768px) 600px, 900px"
                priority={true} // Tilføj dette for billeder i det indledende viewport
              />
              <span className="w-2 h-2 bg-second_color_dark dark:bg-main_color_light absolute rounded-full -top-[5px] left-0"></span>
              <ArticleLink
                href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
                  post.republishArticle && post.newSlug
                    ? post.newSlug
                    : post.articleSlug
                }`}
              >
                <time dateTime={post.publishedAt} className=" text-xs">
                  {timeSinceText({ date: post.publishedAt })}
                </time>
                <h2 className="text-[0.9rem] mt-2 font-semibold text-text_main_color_dark dark:text-text_main_color_light overflow-hidden line-clamp-3">
                  {post.title}
                </h2>
              </ArticleLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default TopNewsSliderTwo;
