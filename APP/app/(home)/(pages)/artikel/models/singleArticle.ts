export interface singleArticle {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    publishedAt: string;
    _type: string;
    title: string;
    teaser: string;
    articleSlug: string | '';
    newSlug: string | '';
    oldSlugs: string[];
    republishArticle: boolean;
    image: {};
    imageTags: {
        extension: string;
        size: string;
        metadata: {
            dimensions: {
                height: string;
                width: string;
            }
        };
    },
    source: string; 
    tag: string[];
    tagSlug: string[];
    category: string | '';
    categorySlug: string;
    JournalistName: string;
    JournalistSlug: string;
    JournalistPhoto: {};
    facebookTitle: string;
    facebookDescription: string;
    facebookImage: {};
    overview: [];
    description: string;
    views: number | 0;
    disclaimer: boolean;
    dayInterval: number;
    startIndex: number;
    endIndex: number;
    reading: number;
    previewMode: boolean;
}