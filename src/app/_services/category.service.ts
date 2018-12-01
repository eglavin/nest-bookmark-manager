import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// This Category Service shares data from the sidebar-nav.component into
// the bookmark-details.component to filter results out of the table.

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categorysource = new BehaviorSubject('');
  pickedcat = this.categorysource.asObservable();

  constructor() { }

  changeCategory(message: string) {
    this.categorysource.next(message);
  }

}
