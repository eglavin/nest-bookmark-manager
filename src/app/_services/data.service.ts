import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private bookmarksData = new BehaviorSubject([]);
  bookmarks = this.bookmarksData.asObservable();

  private bookmarksUpdate = new BehaviorSubject(false);
  updateData = this.bookmarksUpdate.asObservable();

  private categoryData = new BehaviorSubject([]);
  categories = this.categoryData.asObservable();

  private categoryFilter = new BehaviorSubject('');
  activeFilter = this.categoryFilter.asObservable();

  constructor() {}

  updateBookmarks = (data: any) => {
    this.bookmarksData.next(data);
  };

  setUpdate = (state: boolean) => {
    this.bookmarksUpdate.next(state);
  };

  updateCategories = (data: any) => {
    this.categoryData.next(data);
  };

  updateFilter(category: string) {
    this.categoryFilter.next(category);
  }
}
