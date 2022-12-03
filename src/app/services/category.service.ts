import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {}

  public categories$ = this._categories$.asObservable();

  public getCategories() {
    const apiResponse$ = this.http.get(
      `${environment.hostURL}/api/categories`
    ) as Observable<Category[]>;

    apiResponse$.subscribe((data) => {
      this._categories$.next(data);
    });
  }
}
