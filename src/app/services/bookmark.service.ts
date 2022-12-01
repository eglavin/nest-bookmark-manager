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

  constructor(private http: HttpClient) {}

  public bookmarks$ = this._bookmarks$.asObservable();

  public getBookmarks() {
    const apiResponse = this.http.get(
      `${environment.hostURL}/api/bookmarks`
    ) as Observable<Bookmark[]>;

    apiResponse.subscribe((data) => {
      this._bookmarks$.next(data);
    });
  }

  public getBookmark(id: string) {
    return this.http.get(
      `${environment.hostURL}/api/bookmarks/${id}`
    ) as Observable<Bookmark[]>;
  }

  public addBookmark(
    title: string,
    href: string,
    description: string,
    category: string,
    catname: string
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
    category: string,
    catname: string
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

  public deleteBookmark(id: string) {
    const apiResponse = this.http.delete(
      `${environment.hostURL}/api/bookmarks/` + id
    );

    apiResponse.subscribe(() => {
      this.getBookmarks();
    });
  }
}
