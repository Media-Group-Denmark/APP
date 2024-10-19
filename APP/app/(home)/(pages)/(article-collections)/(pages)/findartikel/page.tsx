/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "./components/SearchBar/SearchBar";
/* import FindArticle from "./components/FindArticle/FindArticle"; */
import CustomBreadcrumb from "@/app/(home)/components/Navigation/CustomBreadcrumb";
import { ArticleModel } from "../../models/article";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import FindArticle from "./components/findArticle";
import { getFindArticleData } from "./api/getFindArticleData";

export const revalidate = 6000;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function findArtikel({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    journalist?: string;
    tag?: string;
  };
}) {
  const {
    allArticles: data,
    categories: categories,
    journalists: journalists,
    tags: tags,
  } = (await getFindArticleData()) as {
    allArticles: ArticleModel[];
    categories: Reference[];
    journalists: Reference[];
    tags: Reference[];
  };
  // Anvend dit filter på dataen

  const filteredItems = data.filter((article) => {
    const matchesCategory = searchParams.category
      ? article.categorySlug === searchParams.category
      : true;
    const matchesJournalist = searchParams.journalist
      ? article.JournalistSlug === searchParams.journalist
      : true;
    const matchesTag = searchParams.tag
      ? article.tagSlug.includes(searchParams.tag)
      : true;
    const matchesQuery = searchParams.q
      ? article.title.toLowerCase().includes(searchParams.q.toLowerCase())
      : true;

    return matchesCategory && matchesJournalist && matchesTag && matchesQuery;
  });

  return (
    <section className="pb-12 lg:w-[980px] m-auto">
      <CustomBreadcrumb
        navItem={"Arkivet"}
        link="/findartikel"
        navItemTwo=""
      />
      <SearchBar category={categories} journalist={journalists} tag={tags} />
      <FindArticle data={filteredItems} startIndex={0} endIndex={50} />
    </section>
  );
}
export const runtime = "edge";
