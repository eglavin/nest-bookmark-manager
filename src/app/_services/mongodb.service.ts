import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Imports Data Model
import { Bookmark, Bookmarkadd } from '../_models/bookmark.model';
import { componentFactoryName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(
    private http: HttpClient
  ) {}

  // Create
  addBookmark(
    title: string,
    href: string,
    description: string,
    category: string,
    catname: string,
  ): Observable<any> {
    const bookmark: Bookmarkadd = {
      title: title,
      href: href,
      description: description,
      category: category,
      catname: catname,
    };
    return this.http.post('http://127.0.0.1:8081/api/bookmarks', bookmark);
  }

  // Read
  getBookmarkData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8081/api/bookmarks');
  }
  getBookmark(id: string): Observable<any> {
    return this.http.get('http://127.0.0.1:8081/api/bookmarks/' + id);
  }
  getCategoryData(): Observable<any> {
    return this.http.get('http://127.0.0.1:8081/api/bookmark/categories');
  }

  // Update
  updateBookmark(
    _id: string,
    title: string,
    href: string,
    description: string,
    category: string,
    catname: string,
  ): Observable<any> {
    const bookmark: Bookmarkadd = {
      title: title,
      href: href,
      description: description,
      category: category,
      catname: catname
    };
    return this.http.put('http://127.0.0.1:8081/api/bookmarks/' + _id, bookmark);
  }

  // Delete
  deleteBookmark(id: string): Observable<any> {
    return this.http.delete('http://127.0.0.1:8081/api/bookmarks/' + id);
  }

}
