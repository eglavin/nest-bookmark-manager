export interface Bookmark {
  _id: any;
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
export interface Category {
  _id: any;
  name: string;
}
