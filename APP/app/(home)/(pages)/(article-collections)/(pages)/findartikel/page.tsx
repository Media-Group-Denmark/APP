/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "./components/SearchBar/SearchBar";
/* import FindArticle from "./components/FindArticle/FindArticle"; */
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { ArticleModel } from "../../models/article";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import FindArticle from "./components/findArticle";
import { getFindArticleData } from "./api/getFindArticleData";
import ArticleHeroTest from "../../components/PengehjoernetDK/blocks/ArticleBlock_1_Square";

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
      {/* <Breadcrumb
        navItem={"Arkivet"}
        link="/findartikel"
        navItemTwo=""
      /> */}
      <SearchBar category={categories} journalist={journalists} tag={tags} />
      {/* <FindArticle data={filteredItems} startIndex={0} endIndex={50} /> */}
      <ArticleHeroTest 
        data={filteredItems} 
        startIndex={0} 
        endIndex={50}
        articleAmount={50} 
        imgWidth={400} 
        imgHeight={200} 
        figureDesktopHeight={'11.5em'}
        figureMobileHeight={'8em'}
        quality={85}
        fontSizeMobile={'xl'}
        fontSizeDesktop={'1.2em'}
        fontLineHeight="1.35em"
        fontBold="700"
        lazyLoading={false}
        gridSystem="md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 "
        header={[{ time: true, address: false, category: true }]}
        name="Nyheder"
        contentHeight="140px"
        />
    </section>
  );
}
export const runtime = "edge";
