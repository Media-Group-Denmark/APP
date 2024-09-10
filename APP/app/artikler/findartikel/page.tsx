/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import FindArticle from "@/app/components/ArticleDisplaySystems/StaticSystems/findArticle";
import Breadcrumb from "@/app/components/Navigation/Breadcrumb";
import { getData, freshData } from "@/app/api//data/GetData";
import { Article } from "@/app/models/article";
import { Reference } from "@/app/models/reference";

export const revalidate = 6000;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
  export default async function findArtikel({ searchParams }: { searchParams: { q?: string, category?: string, journalist?: string, tag?: string } }) {

    const { allArticles: data, categories: categories, journalists: journalists, tags: tags } = await getData() as { allArticles: Article[], categories: Reference[], journalists: Reference[], tags: Reference[] };
    // Anvend dit filter på dataen
    
  
    const filteredItems = data.filter(article => {
      const matchesCategory = searchParams.category ? article.categorySlug === searchParams.category : true;
      const matchesJournalist = searchParams.journalist ? article.JournalistSlug === searchParams.journalist : true;
      const matchesTag = searchParams.tag ? article.tagSlug.includes(searchParams.tag) : true;
      const matchesQuery = searchParams.q ? article.title.toLowerCase().includes(searchParams.q.toLowerCase()) : true;
      
      return matchesCategory && matchesJournalist && matchesTag && matchesQuery;
    });

    return (
      <section className="pb-12 lg:w-[980px] m-auto">
        <Breadcrumb navItem={'Arkivet'} link="/artikler/findartikel" navItemTwo="" /> 
        <SearchBar category={categories} journalist={journalists} tag={tags} />
        <FindArticle data={filteredItems} startIndex={0} endIndex={100} />
      </section>
    );
}
export const runtime = 'edge';