export interface Article {
     _id: string;
     _createdAt: string;
     publishedAt: string;
     _type: string;
     title: string;
     teaser: string;
     articleSlug: string | '';
     republishArticle: boolean;
     newSlug: any;
     oldSlugs: string[];
     image: {};
     source: string;
     tag: string[];
     tagSlug: string[];
     category: string | '';
     categorySlug: string;
     JournalistName: string;
     JournalistSlug: string;
     JournalistDetails: [];
     views: number | 0;
     dayInterval: number;
     startIndex: number;
     endIndex: number;
     reading: number;
     previewMode: boolean;
}