/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SubArticlesSixGrid from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import Link from "next/link";
import FindArticle from "@/app/components/ArticleDisplaySystems/StaticSystems/findArticle";
export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
export async function getData(queryParam: any, category: string, journalist: string, tag: string) {
  const today = new Date().toISOString();  
  const query = `
      *[_type == "article" && 
      publishedAt <= "${today}" &&
      previewMode == "false" &&
      title match $queryParam &&
      category->slug.current match $category &&
      journalist->slug.current match $journalist &&
      tag[]->slug.current match $tag
    ] | 
      order(coalesce(publishedAt, _createdAt) desc) [0...50] {
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
          "JournalistName": journalist->name,
          "JournalistPhoto": journalist->image,
          "JournalistSlug": journalist->slug.current,
          "JournalistDetails": journalist->description,
          previewMode
      }`
      const data = await client.fetch(query, { 
        queryParam: `${queryParam}*`, 
        category: `${category}*`, 
        journalist: `${journalist}*`, 
        tag: `${tag}*`
    });
      console.log(`Query: ${queryParam}`);
    return data;
  }

  export async function getCategories() {
    const query = `
      *[_type == "category"] {
        _id,
        name,
        "slug": slug.current
      }`;
    const data = await client.fetch(query);
    return data;
  }

  export async function getJournalists() {
    const query = `
      *[_type == "journalist"] {
        _id,
        name,
        "slug": slug.current
      }`;
    const data = await client.fetch(query);
    return data;
  }

  export async function getTags() {
    const query = `
      *[_type == "tag"] {
        _id,
        name,
        "slug": slug.current
      }`;
    const data = await client.fetch(query);
    return data;
  }
/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
  export default async function findArtikel({ searchParams}: { searchParams: { q?: string, category?: string, journalist?: string, tag?: string } }) {

    const items = await getData(searchParams.q || "", searchParams.category || "", searchParams.journalist || "", searchParams.tag || "");
    const category = await getCategories();
    const journalist = await getJournalists();
    const tag = await getTags();

    return (
      <main className="pb-12 lg:w-[980px] m-auto">
        <nav
          className="flex px-3 md:px-8 max-w-[1000px] m-auto  py-6 pt-6 rounded-lg "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-sm text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 inline-flex items-center "
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Forside
              </Link>
            </li>
            <li className=" cursor-default " aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-accent_color_light dark:text-accent_color_dark ml-1 md:ml-2 text-sm font-medium capitalize ">
                  {" "}
                  Arkivet{" "}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <SearchBar category={category} journalist={journalist} tag={tag} />
        <FindArticle data={items} startIndex={0} endIndex={30} />
      </main>
    );
}

