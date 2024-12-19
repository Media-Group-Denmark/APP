export interface GuideModel {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _type: string;
    title: string;
    teaser: string;
    metaImage: {
        asset: {
            _ref: string;
            _type: string;
        };
    },
    description: string;
    feedSlug: string | '';
    image: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
    source: string;
    JournalistName: string;
    JournalistSlug: string;
    JournalistPhoto: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
    category: string | '';
    previewMode: boolean;
    articles: Array<{
        title: string;
        source: string;
        description: string;
        subImage: {
            asset: {
                _ref: string;
                _type: string;
            };
        };
    }>;
}
