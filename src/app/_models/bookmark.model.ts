export interface Bookmark {
  _id: string;
  title: string;
  href: string;
  description: string;
  category: string;
  catname: string;
}
export interface BookmarkAdd {
  title: string;
  href: string;
  description: string;
  category: string;
  catname: string;
}
