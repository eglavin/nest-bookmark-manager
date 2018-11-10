import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bookmark } from '../_models/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http: HttpClient) { }

  // Create
  addBookmark(
    title: string,
    href: string,
    description: string,
    category: string
  ): Observable<any> {
    const bookmark: Bookmark = {
      title: title,
      href: href,
      description: description,
      category: category
    };
    return this.http.post('http://127.0.0.1:8081/api/posts', bookmark);
  }

  // Read
  getBookmarkData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8081/api/bookmarks');
  }
  getBookmark(id: string): Observable<any> {
    return this.http.get('http://127.0.0.1:8081/api/bookmarks/' + id);
  }

  // Update
  updateBookmark(
    id: string,
    title: string,
    href: string,
    description: string,
    category: string
  ): Observable<any> {
    const bookmark: Bookmark = {
      title: title,
      href: href,
      description: description,
      category: category
    };
    return this.http.put('http://127.0.0.1:8081/api/posts/' + id, bookmark);
  }

  // Delete
  deleteBookmark(id: string): Observable<any> {
    return this.http.delete('http://127.0.0.1:8081/api/bookmarks/' + id);
  }

}
