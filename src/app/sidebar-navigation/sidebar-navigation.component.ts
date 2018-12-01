import { Component, OnInit } from '@angular/core';

// Imports Mongo DB Service
import { MongodbService } from '../_services/mongodb.service';
import { CategoryService } from '../_services/category.service';

// Imports Data Model
import { Category } from '../_models/category.model';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
})
export class SidebarNavigationComponent implements OnInit {

  public categoryDataSource: Category[];
  category: String;

  constructor(
    private mdbs: MongodbService,
    private cat: CategoryService,
  ) { }

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
    this.cat.pickedcat.subscribe(message => this.category = message);
  }


  filter(category: string) {
    console.log(category);
    this.cat.changeCategory(category);
  }
}
