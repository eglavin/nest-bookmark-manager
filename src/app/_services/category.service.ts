import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class category {

  private categorysource = new BehaviorSubject('');
  pickedcat = this.categorysource.asObservable();
  
  constructor() { }

  changeCategory(message: string) {
    this.categorysource.next(message)
  }
  

}
