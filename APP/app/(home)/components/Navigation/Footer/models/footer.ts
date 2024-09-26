export interface FooterItem {
  footerTitle: string;
  _id: string;
  footerItems: {
    title: string;
    _key: string;
    links: {
      _key: string;
      name: string;
      title: string;
      type: string;
      slug: string;
    }[];
  }[];
}
