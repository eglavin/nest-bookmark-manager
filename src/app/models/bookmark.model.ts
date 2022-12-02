export type NewBookmark = {
  title: string;
  href: string;
  description: string;
  category: string;
};

export type Bookmark = NewBookmark & {
  _id: string;
};
