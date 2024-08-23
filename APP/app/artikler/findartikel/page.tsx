/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import FindArticle from "@/app/components/ArticleDisplaySystems/StaticSystems/findArticle";
import Breadcrumb from "@/app/components/Navigation/Breadcrumb";

export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
export async function getInitialData() {
  const today = new Date().toISOString();

  const query = `
    {
      "articles": *[
        _type == "article" && 
        publishedAt <= "${today}" &&
        previewMode == false
      ] | order(coalesce(publishedAt, _createdAt) desc) [0...500] {
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
        "JournalistDetails": journalist->description,
        views,
        previewMode
      },
      "categories": *[_type == "category"] {
        _id,
        name,
        "slug": slug.current
      },
      "journalists": *[_type == "journalist"] {
        _id,
        name,
        "slug": slug.current
      },
      "tags": *[_type == "tag"] {
        _id,
        name,
        "slug": slug.current
      }
    }
  `;

  const data = await client.fetch(query);
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
  export default async function findArtikel({ searchParams }: { searchParams: { q?: string, category?: string, journalist?: string, tag?: string } }) {

    const { articles, categories, journalists, tags } = await getInitialData();
  
    const filteredItems = articles.filter(article => {
      const matchesCategory = searchParams.category ? article.categorySlug === searchParams.category : true;
      const matchesJournalist = searchParams.journalist ? article.JournalistSlug === searchParams.journalist : true;
      const matchesTag = searchParams.tag ? article.tagSlug.includes(searchParams.tag) : true;
      const matchesQuery = searchParams.q ? article.title.includes(searchParams.q) : true;
      
      return matchesCategory && matchesJournalist && matchesTag && matchesQuery;
    });

    return (
      <main className="pb-12 lg:w-[980px] m-auto">
        <Breadcrumb navItem={'Arkivet'} link="/artikler/findartikel" navItemTwo="" />
        <SearchBar category={categories} journalist={journalists} tag={tags} />
        <FindArticle data={filteredItems} startIndex={0} endIndex={30} />
      </main>
    );
}
export const runtime = 'edge';