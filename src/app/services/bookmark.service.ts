import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

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
    const apiResponse$ = this.http.get(
      `${environment.hostURL}/api/bookmarks${
        this._categoryFilter$.value
          ? `/byCategory?id=${this._categoryFilter$.value}`
          : ''
      }`
    ) as Observable<Bookmark[]>;

    apiResponse$.subscribe((data) => {
      this._bookmarks$.next(data);
    });
  }

  public async addBookmark(bookmark: NewBookmark) {
    const apiResponse$ = await lastValueFrom(
      this.http.post(`${environment.hostURL}/api/bookmarks`, bookmark)
    );

    this.getBookmarks();
    return apiResponse$;
  }

  public async updateBookmark(bookmark: Bookmark) {
    const apiResponse$ = await lastValueFrom(
      this.http.put(
        `${environment.hostURL}/api/bookmarks/${bookmark._id}`,
        bookmark
      )
    );

    this.getBookmarks();
    return apiResponse$;
  }

  public async deleteBookmark(_id: string) {
    const apiResponse$ = await lastValueFrom(
      this.http.delete(`${environment.hostURL}/api/bookmarks/${_id}`)
    );

    this.getBookmarks();
    return apiResponse$;
  }
}
