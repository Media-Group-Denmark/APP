import { Article } from "../models/article";

export function filterAndSliceArticles(
    data: Article[],
    category?: string,
    tag?: string | string[],
    journalist?: string,
    dayInterval?: number,
    startIndex: number = 0,
    endIndex: number = 10
  ): Article[] {
    // Find ud af, hvilken dag vi skal filtrere data fra
    const today = new Date();
    today.setDate(today.getDate() - (dayInterval || 0));
    const queryDayIndicator = today.toISOString();
  
    // Filtrér og slice data baseret på kategori, tag, journalist og daginterval
    return data
      .filter(post => {
        const ifDefinedCategory = category ? post.categorySlug === category : true;
        const ifDefinedJournalist = journalist ? post.JournalistSlug === journalist : true;
        const ifDefinedDayInterval = dayInterval ? post.publishedAt >= queryDayIndicator : true;
        const ifDefinedTag = tag ? post.tagSlug.includes(tag as string) : true;
        return ifDefinedCategory && ifDefinedJournalist && ifDefinedDayInterval && ifDefinedTag;
      })
      .slice(startIndex, endIndex);
  }