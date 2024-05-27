export interface Article {
     _id: string;
     _createdAt: string;
     _updatedAt: string;
     _type: string;
     _rev: string;
     title: string;
     teaser: string;
     articleSlug: string;
     image: {};
     source: string;
     tag: string[];
     tagSlug: string[];
     category: string | '';
     categorySlug: string;
     JournalistName: string;
     JournalistPhoto: {};
     JournalistSlug: string;
     JournalistDetails: [];
     overview: [];
     views: number;
     disclaimer: boolean;
     dayInterval: number;
     startIndex: number;
     endIndex: number;
}