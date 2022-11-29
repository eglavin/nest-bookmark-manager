import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Imports Data Model
import { BookmarkAdd } from '../app.models';

@Injectable({
  providedIn: 'root',
})
export class MongodbService {
  constructor(private http: HttpClient) {}

  baseURL: string = 'http://127.0.0.1';

  // Create
  addBookmark(
    title: string,
    href: string,
    description: string,
    category: string,
    catname: string
  ): Observable<any> {
    const bookmark: BookmarkAdd = {
      title: title,
      href: href,
      description: description,
      category: category,
      catname: catname,
    };

    return this.http.post(`${this.baseURL}/api/bookmarks`, bookmark);
  }

  // Read
  getBookmarkData(): Observable<any> {
    return this.http.get(`${this.baseURL}/api/bookmarks`);
  }
  getBookmark(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/api/bookmarks/` + id);
  }
  getCategoryData(): Observable<any> {
    return this.http.get(`${this.baseURL}/api/bookmark/categories`);
  }

  // Update
  updateBookmark(
    _id: string,
    title: string,
    href: string,
    description: string,
    category: string,
    catname: string
  ): Observable<any> {
    const bookmark: BookmarkAdd = {
      title: title,
      href: href,
      description: description,
      category: category,
      catname: catname,
    };

    return this.http.put(`${this.baseURL}/api/bookmarks/` + _id, bookmark);
  }

  // Delete
  deleteBookmark(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/api/bookmarks/` + id);
  }
}
