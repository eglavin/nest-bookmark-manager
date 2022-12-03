import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { Bookmark, NewBookmark } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private _bookmarks$ = new BehaviorSubject<Bookmark[]>([]);
  private _categoryFilter$ = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  public bookmarks$ = this._bookmarks$.asObservable();

  public categoryFilter$ = this._categoryFilter$.asObservable();
  public setCategoryFilter$(categoryId: string) {
    this._categoryFilter$.next(categoryId);

    this.getBookmarks();
  }

  public getBookmarks() {
    const apiResponse = this.http.get(
      `${environment.hostURL}/api/bookmarks${
        this._categoryFilter$.value
          ? `/byCategory?id=${this._categoryFilter$.value}`
          : ''
      }`
    ) as Observable<Bookmark[]>;

    apiResponse.subscribe((data) => {
      this._bookmarks$.next(data);
    });
  }

  public addBookmark(
    title: string,
    href: string,
    description: string,
    category: string
  ) {
    const bookmark: NewBookmark = {
      title: title,
      href: href,
      description: description,
      category: category,
    };

    return this.http.post(`${environment.hostURL}/api/bookmarks`, bookmark);
  }

  public updateBookmark(
    _id: string,
    title: string,
    href: string,
    description: string,
    category: string
  ) {
    const bookmark: NewBookmark = {
      title: title,
      href: href,
      description: description,
      category: category,
    };

    return this.http.put(
      `${environment.hostURL}/api/bookmarks/${_id}`,
      bookmark
    );
  }

  public deleteBookmark(_id: string) {
    const apiResponse = this.http.delete(
      `${environment.hostURL}/api/bookmarks/${_id}`
    );

    apiResponse.subscribe(() => {
      this.getBookmarks();
    });
  }
}
