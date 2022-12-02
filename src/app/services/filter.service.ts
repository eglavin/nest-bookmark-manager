import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filter$ = new BehaviorSubject('');

  public activeFilter$ = this._filter$.asObservable();
  public setActiveFilter$(newCategory: string) {
    this._filter$.next(newCategory);
  }
}
