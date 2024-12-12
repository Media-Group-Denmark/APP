export interface MSNFeedModel {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _type: string;
    title: string;
    teaser: string;
    description: string;
    feedSlug: string | '';
    image: {};
    source: string;
    category: string | '';
    previewMode: boolean;
}