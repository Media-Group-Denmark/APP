import { client, urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `
  *[
    _type == "article"
  ]
  | order(views desc) {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    publishedAt,
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

async function SidebarSticky() {
  const data: Article[] = await getData();
  return (
    <div className="hidden md:grid md:grid-cols-1 px-6 md:px-0 gap-8 h-fit md:sticky top-20 xl:gap-6 mb-10 max-w-[300px]">
      
      {data.slice(1, 5).map((article) => (
        <div
          key={article._id}
          className="w-full bg-second_color_light dark:bg-second_color_dark  rounded-lg relative  "
        >
          <Link href={`/artikel/${article.articleSlug}`}>
            <div
              className="block w-full h-[10em] bg-second_color_light dark:bg-second_color_dark rounded-t-lg bg-center bg-cover"
              style={{
                backgroundImage: `url(${urlFor(article.image)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()})`,
              }}
            ></div>
          </Link>
          <div className="grid grid-rows-[auto_1fr_auto] h-[150px] mx-4 mb-4 ">
            <div className="grid grid-cols-2 align-middle my-2">
              <Link href={`/artikler/kategori/${article.categorySlug}`}>
                <button className=" text-accent_color_light dark:text-accent_color_dark  mr-auto hover:bg-slate-200 bg-opacity-20 p-1 text-[0.85rem] rounded-full ">
                  {article.category}
                </button>
              </Link>
              <p className="rounded-lg my-auto ml-auto text-xs">
                {timeSinceText({ date: article.publishedAt })}
              </p>
            </div>
            <Link href={`/artikel/${article.articleSlug}`}>
              <span className="grid ">
                <h1 className=" text-[0.95rem]  rounded-lg ">
                  {article.title}
                </h1>
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarSticky;

